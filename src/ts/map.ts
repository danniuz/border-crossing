import { getPopupTemplate } from './popup-template.ts';
import mapboxgl, { type MapOptions } from 'mapbox-gl';
import type { Feature, FeatureCollection } from 'geojson';
import type { BorderCrossingProperties, BorderCrossingGeometry } from './types';

export function initMap(): mapboxgl.Map {
    const mapboxAccessToken = 'pk.eyJ1IjoiZGFuaWRlbyIsImEiOiJjbWRyNXB5dGswYWoxMmxxdnh0d2lvNXAyIn0.gujYWabrd2G8fqT2eEyS7g';

    const geojson: FeatureCollection<BorderCrossingGeometry, BorderCrossingProperties> = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [34.855499, 32.109333],
                },
                properties: {
                    region: "יהודה ושומרון",
                    name: "מעבר אליהו",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMUwYxiaYtYWqE-5kQLypuZw8BgWMtkU6Q0I4Gw6pOLmWx4QFr9qmJ5YKTTw9JM-o1ZJ4&usqp=CAU",
                    location: {
                        road: 60,
                        junction: "ידרעל",
                        direction: "ממשיך לכיוון דרום, צפונית לג'נין"
                    },
                    contact: {
                        phone: "04-6582147"
                    },
                    statuses: {
                        pedestrians: false,
                        vehicles: true,
                        goods: true
                    }
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [35.001499, 32.139333],
                },
                properties: {
                    region: "יהודה ושומרון",
                    name: "מעבר אליהו",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMUwYxiaYtYWqE-5kQLypuZw8BgWMtkU6Q0I4Gw6pOLmWx4QFr9qmJ5YKTTw9JM-o1ZJ4&usqp=CAU",
                    location: {
                        road: 60,
                        junction: "ידרעל",
                        direction: "ממשיך לכיוון דרום, צפונית לג'נין"
                    },
                    contact: {
                        phone: "04-6582147"
                    },
                    statuses: {
                        pedestrians: false,
                        vehicles: true,
                        goods: true
                    }
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [34.901499, 31.944333],
                },
                properties: {
                    region: "יהודה ושומרון",
                    name: "מעבר אליהו",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMUwYxiaYtYWqE-5kQLypuZw8BgWMtkU6Q0I4Gw6pOLmWx4QFr9qmJ5YKTTw9JM-o1ZJ4&usqp=CAU",
                    location: {
                        road: 60,
                        junction: "ידרעל",
                        direction: "ממשיך לכיוון דרום, צפונית לג'נין"
                    },
                    contact: {
                        phone: "04-6582147"
                    },
                    statuses: {
                        pedestrians: false,
                        vehicles: true,
                        goods: true
                    }
                }
            },
        ]
    };

    const mapObject: MapOptions = {
        container: 'map',
        center: [34.855499, 32.109333],
        zoom: 9,
        style: 'mapbox://styles/danideo/cmdr64m8f00da01qs3oecbuk7',
    };

    mapboxgl.accessToken = mapboxAccessToken;
    const map = new mapboxgl.Map(mapObject);

    // Wait for the map to load before adding markers
    map.on('load', () => {
        for (const feature of geojson.features) {
            createMapboxPopup(feature, map);
        }
    });

    return map;
}

function createMapboxPopup(feature: Feature<BorderCrossingGeometry, BorderCrossingProperties>, map: mapboxgl.Map) {

    const el = document.createElement('div');
    el.className = 'map-marker';

    el.addEventListener('click', () => {
        el.classList.add('map-marker--selected');

        map.flyTo({
            center: feature.geometry.coordinates,
            essential: true
        });
    });

    const tooltipPopup = new mapboxgl.Popup({ offset: 15, closeButton: false })
        .setHTML(
            getPopupTemplate(feature)
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
