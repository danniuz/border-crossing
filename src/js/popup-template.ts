//example
/**
 * 
 * @type {Object}
 */
// {
//     type: 'Feature',
//     geometry: {
//         type: 'Point',
//         coordinates: [34.855499, 32.109333],
//     },
//     properties: {
//         region: "יהודה ושומרון",
//         name: "מעבר אליהו",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMUwYxiaYtYWqE-5kQLypuZw8BgWMtkU6Q0I4Gw6pOLmWx4QFr9qmJ5YKTTw9JM-o1ZJ4&usqp=CAU",
//         location: {
//             road: 60,
//             junction: "ידרעל",
//             direction: "ממשיך לכיוון דרום, צפונית לג'נין"
//         },
//         contact: {
//             phone: "04-6582147"
//         },
//         statuses: {
//             pedestrians: false,
//             vehicles: true,
//             goods: true
//         }
//     }
// }

export function getPopupTemplate(feature: any) {
  return `
      <div class="popup">
        <div class="popup__content">
          <p class="popup__region text-xs">${feature.properties.region}</p>
          <h2 class="popup__title">${feature.properties.name}</h2>
          <p class="popup__address text-s">
            <img src="icons/location.svg" class="popup__address-icon" alt="Location">
            המעבר נמצא על כביש ${feature.properties.location.road}, בצומת ${feature.properties.location.junction} יש להמשיך לכיוון ${feature.properties.location.direction}
          </p>
          <p class="popup__contact text-s">
            <img src="icons/call.svg" class="popup__contact-icon" alt="Phone">
            ${feature.properties.contact.phone}
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
              <span class="popup__status-indicator ${feature.properties.statuses.goods ? 'popup__status-indicator--active' : ''}"></span>
              סחורות
            </div>
          </div>

          <button class="popup__button">
            <img src="icons/arrow-up-left.svg" class="popup__button-icon" alt="Arrow Up Left">
          </button>
        </div>

        <img class="popup__image" src="${feature.properties.image}" alt="${feature.properties.name}" />
      </div>
    `;
}