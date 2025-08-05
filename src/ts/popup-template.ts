import type { Feature } from 'geojson';
import type { BorderCrossingProperties, BorderCrossingGeometry } from './types';

export function getPopupTemplate(feature: Feature<BorderCrossingGeometry, BorderCrossingProperties>) {
  return `
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

        <img class="popup__image" src="${feature.properties.lobbyImage}" alt="${feature.properties.title}" />
      </div>
    `;
}