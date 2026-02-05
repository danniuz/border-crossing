const SCROLL_LOCK_CLASS = 'is-scroll-locked';

const lockScroll = () => {
  document.body.classList.add(SCROLL_LOCK_CLASS);
};

const unlockScroll = () => {
  document.body.classList.remove(SCROLL_LOCK_CLASS);
};

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

  lockScroll();

  requestAnimationFrame(() => {
    placePopupWrapper.classList.add('video-popup__wrapper--open');
  });

  const closeButtons = [placePopupWrapper.querySelector('.video-popup__close')];

  closeButtons.forEach((button) => {
    button?.addEventListener('click', () => {
      closePopup(placePopupWrapper);
    });
  });
}

function closePopup(popupElement) {
  // Add closing class to trigger slide-out animation
  popupElement.classList.remove('video-popup__wrapper--open');
  popupElement.classList.add('video-popup__wrapper--closing');

  const onEnd = (e) => {
    if (e.target !== popupElement) return;
    popupElement.removeEventListener('transitionend', onEnd);

    unlockScroll();

    if (popupElement.parentNode) {
      popupElement.remove();
    }
  };

  popupElement.addEventListener('transitionend', onEnd);
}