import { initAsideTogglerAccordion } from './aside-toggler.js';

/**
 * @param {Object} params
 * @param {boolean} params.opened
 */
export function initAside({ opened }) {
  const asideWrapper = document.getElementById('aside-wrapper');
  if (!asideWrapper) return;

  const ui = {
    desktop: {
      open: document.getElementById('aside-toggler-opened'),
      close: document.getElementById('aside-toggler-closed'),
    },
    mobile: {
      open: document.getElementById('aside-toggler-opened-mobile'),
      close: document.getElementById('aside-toggler-closed-mobile'),
    },
  };

  const featureList = document.getElementById('aside-feature-list-wrapper');

  if (
    !ui.desktop.open ||
    !ui.desktop.close ||
    !ui.mobile.open ||
    !ui.mobile.close
  )
    return;

  const isMobile = () => window.innerWidth <= 1240;

  let hasExpanded = false;

  const expandToFull = () => {
    if (hasExpanded) return;
    asideWrapper.classList.add('aside__wrapper--full');
    hasExpanded = true;
  };

  const resetSheetState = () => {
    hasExpanded = false;
    asideWrapper.classList.remove('aside__wrapper--full');
  };

  const isOpened = () =>
    asideWrapper.classList.contains('aside__wrapper--opened');

  if (featureList) {
    featureList.addEventListener(
      'scroll',
      () => {
        if (isMobile() && isOpened()) {
          expandToFull();
        }
      },
      { passive: true },
    );

    let touchStartY = 0;

    featureList.addEventListener(
      'touchstart',
      (event) => {
        touchStartY = event.touches[0]?.clientY ?? 0;
      },
      { passive: true },
    );

    featureList.addEventListener(
      'touchmove',
      (event) => {
        if (!isMobile() || !isOpened() || hasExpanded) return;

        const currentY = event.touches[0]?.clientY ?? touchStartY;
        const deltaY = touchStartY - currentY;

        if (deltaY > 18) {
          expandToFull();
        }
      },
      { passive: true },
    );
  }

  const toggleAside = (buttons) => {
    const willBeOpened = !isOpened();

    asideWrapper.classList.toggle('aside__wrapper--opened');
    buttons.open.classList.toggle('aside-toggler-button--shown');
    buttons.close.classList.toggle('aside-toggler-button--shown');

    if (willBeOpened) {
      resetSheetState();

      if (isMobile()) {
        asideWrapper.classList.remove('aside__wrapper--full');
      }
    }
  };

  const bindToggle = (buttons) => {
    buttons.open.addEventListener('click', () => toggleAside(buttons));
    buttons.close.addEventListener('click', () => toggleAside(buttons));
  };

  bindToggle(ui.desktop);
  bindToggle(ui.mobile);

  const applyInitialState = (buttons) => {
    if (opened) {
      asideWrapper.classList.add('aside__wrapper--opened');
    } else {
      buttons.open.classList.remove('aside-toggler-button--shown');
      buttons.close.classList.add('aside-toggler-button--shown');
    }
  };

  applyInitialState(ui.desktop);
  applyInitialState(ui.mobile);

  initAsideTogglerAccordion('.aside__toggle-filters', '.aside-filter__wrapper');

  setTimeout(() => {
    asideWrapper.classList.add('aside__wrapper--ready');
    ui.desktop.open.classList.add('aside-toggler-button--ready');
    ui.desktop.close.classList.add('aside-toggler-button--ready');
  }, 100);

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      asideWrapper.classList.remove('aside__wrapper--full');
    }
  });
}
