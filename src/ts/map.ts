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
                    title: "מעבר אליהו",
                    area: "יהודה ושומרון",
                    lobbyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMUwYxiaYtYWqE-5kQLypuZw8BgWMtkU6Q0I4Gw6pOLmWx4QFr9qmJ5YKTTw9JM-o1ZJ4&usqp=CAU",
                    addressDescription: "המעבר נמצא על כביש 60. בצומת יזרעאל יש להמשיך לכיוון דרום, צפונית לג'נין",
                    phoneNumber: "04-6582147",
                    statuses: {
                        pedestrians: false,
                        vehicles: true,
                        merchandise: true
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
                    title: "מעבר אליהו",
                    area: "יהודה ושומרון",
                    lobbyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMUwYxiaYtYWqE-5kQLypuZw8BgWMtkU6Q0I4Gw6pOLmWx4QFr9qmJ5YKTTw9JM-o1ZJ4&usqp=CAU",
                    addressDescription: "המעבר נמצא על כביש 60. בצומת יזרעאל יש להמשיך לכיוון דרום, צפונית לג'נין",
                    phoneNumber: "04-6582147",
                    statuses: {
                        pedestrians: false,
                        vehicles: true,
                        merchandise: true
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
                    title: "מעבר אליהו",
                    area: "יהודה ושומרון",
                    lobbyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMUwYxiaYtYWqE-5kQLypuZw8BgWMtkU6Q0I4Gw6pOLmWx4QFr9qmJ5YKTTw9JM-o1ZJ4&usqp=CAU",
                    addressDescription: "המעבר נמצא על כביש 60. בצומת יזרעאל יש להמשיך לכיוון דרום, צפונית לג'נין",
                    phoneNumber: "04-6582147",
                    statuses: {
                        pedestrians: false,
                        vehicles: true,
                        merchandise: true
                    }
                }
            },
        ]
    };

    const mapObject: MapOptions = {
        container: 'map',
        center: [34.855499, 32.109333],
        zoom: 9,
        style: 'mapbox://styles/danideo/cmdycziua00ar01sc63x005c0',
    };

    mapboxgl.accessToken = mapboxAccessToken;
    const map = new mapboxgl.Map(mapObject);

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
