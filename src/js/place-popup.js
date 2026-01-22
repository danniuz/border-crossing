import { initPlaceChart } from './init-place-chart.js';
import { initDropdowns } from './dropdown-outline.js';
import { initAsideTogglerAccordion } from './aside-toggler.js';

export function initPlacePopup() {
  const PlacePopupTogglers = document.querySelectorAll('.place-popup-toggler');

  if (!PlacePopupTogglers?.length) {
    return;
  }

  setTimeout(() => {
    fetch('place-popup.html')
      .then((response) => response.text())
      .then((html) => {
        showPopup(html);
      });
  });

  PlacePopupTogglers.forEach((toggler) => {
    toggler.addEventListener('click', () => {
      fetch('place-popup.html')
        .then((response) => response.text())
        .then((html) => {
          showPopup(html);
        });
    });
  });
}

function showPopup(html) {
  // Remove any existing popup
  const existingPopup = document.querySelector('.place-popup__wrapper');
  if (existingPopup) {
    closePopup(existingPopup);
    return;
  }

  const placePopupWrapper = document.createElement('div');
  placePopupWrapper.classList.add('place-popup__wrapper');
  placePopupWrapper.classList.add('scrollbar-secondary');
  placePopupWrapper.innerHTML = html;

  document.body.appendChild(placePopupWrapper);

  initPlaceChart();
  initDropdowns();

  initAsideTogglerAccordion(
    '.graph__toggle-filters',
    '.graph__tag-list-wrapper',
  );

  // Trigger the slide-in animation after a small delay to ensure the element is rendered
  requestAnimationFrame(() => {
    placePopupWrapper.classList.add('place-popup__wrapper--open');
  });

  const closeButton = placePopupWrapper.querySelector('.place-popup__close');

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closePopup(placePopupWrapper);
    });
  }
}

function closePopup(popupElement) {
  // Add closing class to trigger slide-out animation
  popupElement.classList.remove('place-popup__wrapper--open');
  popupElement.classList.add('place-popup__wrapper--closing');

  // Remove the element after animation completes
  setTimeout(() => {
    if (popupElement.parentNode) {
      popupElement.remove();
    }
  }, 300); // Match the CSS transition duration
}
