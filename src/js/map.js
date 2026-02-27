import { featureCollection } from './data/features.js';
import mapboxgl from 'mapbox-gl';

const markersByMap = new WeakMap();

export function initMap() {
  const mapHtml = document.getElementById('map');

  if (!mapHtml) {
    return;
  }

  const isMobile = window.innerWidth < 1220;

  const getCoordinates = () =>
    isMobile ? [34.734238, 32.220142] : [34.134238, 32.220142];

  const getZoom = () => (isMobile ? 7.2 : 8.5);

  const mapboxAccessToken =
    'pk.eyJ1IjoiZGFuaWRlbyIsImEiOiJjbWRyNXB5dGswYWoxMmxxdnh0d2lvNXAyIn0.gujYWabrd2G8fqT2eEyS7g';

  const mapObject = {
    container: 'map',
    center: getCoordinates(),
    zoom: getZoom(),
    style: 'mapbox://styles/danideo/cmdycziua00ar01sc63x005c0',
  };

  mapboxgl.accessToken = mapboxAccessToken;
  const map = new mapboxgl.Map(mapObject);

  map.on('load', () => {
    for (const feature of featureCollection.features) {
      createMapboxPopup(feature, map);
    }
  });

  // removeMapboxPopups(map);

  return map;
}

/**
 * @param {import('./data/features.js').Feature} feature
 * @param {mapboxgl.Map} map
 */
function createMapboxPopup(feature, map) {
  const el = document.createElement('div');
  const isDisabled = Boolean(feature.disabled ?? feature.properties?.disabled);
  el.className = isDisabled ? 'map-marker map-marker--disabled' : 'map-marker';

  if (!isDisabled) {
    el.addEventListener('click', () => {
      el.classList.add('map-marker--selected');

      map.flyTo({
        center: feature.geometry.coordinates,
        essential: true,
      });
    });
  }

  const marker = new mapboxgl.Marker({
    element: el,
  });

  marker.setLngLat(feature.geometry.coordinates);

  if (feature.properties && !isDisabled) {
    const popupHTML = createTooltip(feature.properties);

    const tooltipPopup = new mapboxgl.Popup({
      offset: 15,
      closeButton: false,
    }).setHTML(popupHTML);

    tooltipPopup.on('close', () => {
      el.classList.remove('map-marker--selected');
    });

    marker.setPopup(tooltipPopup);
  }

  marker.addTo(map);
  trackMapMarker(map, marker);
}

/**
 * Removes every marker and popup created by `createMapboxPopup` for a map.
 * @param {mapboxgl.Map} map
 */
export function removeMapboxPopups(map) {
  const markers = markersByMap.get(map);

  if (!markers || markers.length === 0) {
    return;
  }

  for (const marker of markers) {
    const popup = marker.getPopup();

    if (popup) {
      popup.remove();
    }

    marker.remove();
  }

  markersByMap.delete(map);
}

/**
 * @param {mapboxgl.Map} map
 * @param {mapboxgl.Marker} marker
 */
function trackMapMarker(map, marker) {
  const markers = markersByMap.get(map) ?? [];
  markers.push(marker);
  markersByMap.set(map, markers);
}

function createTooltip(properties) {
  return `
        <a class="popup popup--map-feature-item">
            <div class="popup__content">
                <p class="popup__region text-xs">${properties.area}</p>
                <h2 class="popup__title">${properties.title}</h2>
                <p class="popup__address text-s">
                    <img src="icons/location.svg" class="popup__address-icon" alt="Location">
                    ${properties.addressDescription}
                </p>
                <p class="popup__contact text-s">
                    <img src="icons/call.svg" class="popup__contact-icon" alt="Phone">
                    ${properties.phoneNumber}
                </p>
                <div class="popup__status-list">
                    <div class="popup__status ${properties.statuses.pedestrians ? 'popup__status--active' : ''}">
                        <img src="icons/man.svg" class="popup__status-icon" alt="">
                        <span class="popup__status-label">פתוח</span>
                    </div>
                    <div class="popup__status ${properties.statuses.pedestrians ? 'popup__status--active' : ''}">
                        <img src="icons/car.svg" class="popup__status-icon" alt="">
                        <span class="popup__status-label">סגור</span>
                    </div>
                    <div class="popup__status ${properties.statuses.pedestrians ? 'popup__status--active' : ''}">
                        <img src="icons/truck.svg" class="popup__status-icon" alt="">
                        <span class="popup__status-label">סגור</span>
                    </div>
                </div>
                <button class="popup__button">
                    <img src="icons/arrow-up-left-sm.svg" class="popup__button-icon" alt="Arrow Up Left">
                </button>
            </div>
            <img class="popup__image" src="${properties.lobbyImage}" alt="${properties.title}">
        </a>
    `;
}
