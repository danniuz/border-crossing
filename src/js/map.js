import { featureCollection } from './data/features.js';
import mapboxgl from 'mapbox-gl';

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

  return map;
}

/**
 * @param {import('./data/features.js').Feature} feature
 * @param {mapboxgl.Map} map
 */
function createMapboxPopup(feature, map) {
  const el = document.createElement('div');
  el.className = 'map-marker';

  el.addEventListener('click', () => {
    el.classList.add('map-marker--selected');

    map.flyTo({
      center: feature.geometry.coordinates,
      essential: true,
    });
  });

  const popupHTML = `
        <div class="popup">
            <div class="popup__content">
                <p class="popup__region text-xs">${feature.properties.area}</p>
                <h2 class="popup__title">${feature.properties.title}</h2>
                <p class="popup__address text-s">
                    <img src="icons/location.svg" class="popup__address-icon" alt="Location">
                    ${feature.properties.addressDescription}
                </p>
                <p class="popup__contact text-s">
                    <img src="icons/call.svg" class="popup__contact-icon" alt="Phone">
                    ${feature.properties.phoneNumber}
                </p>
                <div class="popup__status-list">
                    <div class="popup__status">
                        <span class="popup__status-indicator ${feature.properties.statuses.pedestrians ? 'popup__status-indicator--active' : ''}"></span>
                        הולכי רגל
                    </div>
                    <div class="popup__status">
                        <span class="popup__status-indicator ${feature.properties.statuses.vehicles ? 'popup__status-indicator--active' : ''}"></span>
                        כלי רכב
                    </div>
                    <div class="popup__status">
                        <span class="popup__status-indicator ${feature.properties.statuses.merchandise ? 'popup__status-indicator--active' : ''}"></span>
                        סחורות
                    </div>
                </div>
                <button class="popup__button">
                    <img src="icons/arrow-up-left.svg" class="popup__button-icon" alt="Arrow Up Left">
                </button>
            </div>
            <img class="popup__image" src="${feature.properties.lobbyImage}" alt="${feature.properties.title}">
        </div>
    `;

  const tooltipPopup = new mapboxgl.Popup({
    offset: 15,
    closeButton: false,
  }).setHTML(popupHTML);

  tooltipPopup.on('close', () => {
    el.classList.remove('map-marker--selected');
  });

  new mapboxgl.Marker({
    element: el,
  })
    .setLngLat(feature.geometry.coordinates)
    .setPopup(tooltipPopup)
    .addTo(map);
}
