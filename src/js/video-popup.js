export function initVideoPopup(open = false) {
  const PlacePopupTogglers = document.querySelectorAll('.video-popup-toggler');

  if (!PlacePopupTogglers?.length) {
    return;
  }

  if (open) {
    fetch('video-popup.html')
      .then((response) => response.text())
      .then((html) => {
        showPopup(html);
      });
  }

  PlacePopupTogglers.forEach((toggler) => {
    toggler.addEventListener('click', () => {
      fetch('video-popup.html')
        .then((response) => response.text())
        .then((html) => {
          showPopup(html);
        });
    });
  });
}

function showPopup(html) {
  const existingPopup = document.querySelector('.video-popup__wrapper');

  if (existingPopup) {
    closePopup(existingPopup);
    return;
  }

  const placePopupWrapper = document.createElement('div');
  placePopupWrapper.classList.add('video-popup__wrapper');
  placePopupWrapper.innerHTML = html;

  document.body.appendChild(placePopupWrapper);

  requestAnimationFrame(() => {
    placePopupWrapper.classList.add('video-popup__wrapper--open');
  });

  const closeButtons = [placePopupWrapper.querySelector('.video-popup__close')];

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closePopup(placePopupWrapper);
    });
  });
}

function closePopup(popupElement) {
  // Add closing class to trigger slide-out animation
  popupElement.classList.remove('video-popup__wrapper--open');
  popupElement.classList.add('video-popup__wrapper--closing');

  // Remove the element after animation completes
  setTimeout(() => {
    if (popupElement.parentNode) {
      popupElement.remove();
    }
  }, 300); // Match the CSS transition duration
}
