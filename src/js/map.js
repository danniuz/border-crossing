import { FeatureItemComponent } from './feature-item-component.js';
import { featureCollection } from './data/features.js';
import mapboxgl from 'mapbox-gl';

export function initMap() {
    const mapboxAccessToken = 'pk.eyJ1IjoiZGFuaWRlbyIsImEiOiJjbWRyNXB5dGswYWoxMmxxdnh0d2lvNXAyIn0.gujYWabrd2G8fqT2eEyS7g';

    const mapObject = {
        container: 'map',
        center: [34.855499, 32.109333],
        zoom: 9,
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
            essential: true
        });
    });

    const featureItemComponent = new FeatureItemComponent(feature);
    const tooltipPopup = new mapboxgl.Popup({ offset: 15, closeButton: false })
        .setHTML(
            featureItemComponent.getHTML()
        )

    tooltipPopup.on('close', () => {
        el.classList.remove('map-marker--selected');
    });

    new mapboxgl
        .Marker({
            element: el,
        })
        .setLngLat(feature.geometry.coordinates)
        .setPopup(tooltipPopup)
        .addTo(map);
} 