/**
 * @typedef {Object} Statuses
 * @property {boolean} pedestrians
 * @property {boolean} vehicles
 * @property {boolean} merchandise
 */

/**
 * @typedef {Object} BorderCrossingProperties
 * @property {string} title
 * @property {string} area
 * @property {string} lobbyImage
 * @property {string} addressDescription
 * @property {string} phoneNumber
 * @property {Statuses} statuses
 */

/**
 * @typedef {Object} BorderCrossingGeometry
 * @property {'Point'} type
 * @property {[number, number]} coordinates
 */

/**
 * @typedef {Object} Feature
 * @property {'Feature'} type
 * @property {BorderCrossingGeometry} geometry
 * @property {BorderCrossingProperties} properties
 */

/**
 * @typedef {Object} FeatureCollection
 * @property {'FeatureCollection'} type
 * @property {Feature[]} features
 */

export const borderCrossingFeatures = [
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
            title: "מעבר גלבוע",
            area: "יהודה ושומרון",
            lobbyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMUwYxiaYtYWqE-5kQLypuZw8BgWMtkU6Q0I4Gw6pOLmWx4QFr9qmJ5YKTTw9JM-o1ZJ4&usqp=CAU",
            addressDescription: "המעבר נמצא על כביש 60. בצומת יזרעאל יש להמשיך לכיוון דרום, צפונית לג'נין",
            phoneNumber: "04-6582147",
            statuses: {
                pedestrians: true,
                vehicles: true,
                merchandise: false
            }
        }
    }
];

export const featureCollection = {
    type: 'FeatureCollection',
    features: borderCrossingFeatures
}; 