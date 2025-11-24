export function initMapPopup(open = false) {
  const PlacePopupTogglers = document.querySelectorAll('.map-popup-toggler');

  if (!PlacePopupTogglers?.length) {
    return;
  }

  if (open) {
    fetch('map-popup.html')
      .then((response) => response.text())
      .then((html) => {
        showPopup(html);
      });
  }

  PlacePopupTogglers.forEach((toggler) => {
    toggler.addEventListener('click', () => {
      fetch('map-popup.html')
        .then((response) => response.text())
        .then((html) => {
          showPopup(html);
        });
    });
  });
}

function showPopup(html) {
  const existingPopup = document.querySelector('.map-popup__wrapper');

  if (existingPopup) {
    closePopup(existingPopup);
    return;
  }

  const placePopupWrapper = document.createElement('div');
  placePopupWrapper.classList.add('map-popup__wrapper');
  placePopupWrapper.innerHTML = html;

  document.body.appendChild(placePopupWrapper);

  requestAnimationFrame(() => {
    placePopupWrapper.classList.add('map-popup__wrapper--open');
  });

  const closeButtons = [
    placePopupWrapper.querySelector('.map-popup__close'),
    placePopupWrapper.querySelector('.map-warning__action-reject'),
  ];

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closePopup(placePopupWrapper);
    });
  });
}

function closePopup(popupElement) {
  // Add closing class to trigger slide-out animation
  popupElement.classList.remove('map-popup__wrapper--open');
  popupElement.classList.add('map-popup__wrapper--closing');

  // Remove the element after animation completes
  setTimeout(() => {
    if (popupElement.parentNode) {
      popupElement.remove();
    }
  }, 300); // Match the CSS transition duration
}
