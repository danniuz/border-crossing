import { FeatureItemComponent } from './feature-item-component.js';

/**
 * @param {Object} params
 * @param {boolean} params.opened
 */
export function initAside(params) {
    const asideWrapper = document.getElementById('aside-wrapper');
    const asideTogglerOpened = document.getElementById('aside-toggler-opened');
    const asideTogglerClosed = document.getElementById('aside-toggler-closed');

    if (params.opened) {
        asideWrapper.classList.add('aside__wrapper--opened');
    } else {
        asideTogglerOpened.classList.remove('aside-toggler-button--shown');
        asideTogglerClosed.classList.add('aside-toggler-button--shown');
    }

    asideTogglerOpened.addEventListener('click', () => {
        asideWrapper.classList.toggle('aside__wrapper--opened');
        asideTogglerOpened.classList.toggle('aside-toggler-button--shown');
        asideTogglerClosed.classList.toggle('aside-toggler-button--shown');
    });

    asideTogglerClosed.addEventListener('click', () => {
        asideWrapper.classList.toggle('aside__wrapper--opened');
        asideTogglerOpened.classList.toggle('aside-toggler-button--shown');
        asideTogglerClosed.classList.toggle('aside-toggler-button--shown');
    });

    setTimeout(() => {
        asideWrapper.classList.add('aside__wrapper--ready');
        asideTogglerOpened.classList.add('aside-toggler-button--ready');
        asideTogglerClosed.classList.add('aside-toggler-button--ready');
    }, 100);
}

/**
 * @param {import('./data/features.js').Feature} feature
 * @param {HTMLElement} container
 * @returns {FeatureItemComponent}
 */
export function createAsidePopup(feature, container) {
    const featureItemComponent = new FeatureItemComponent(feature, {
        showImage: true,
        showButton: true,
        className: 'popup--aside'
    });

    container.appendChild(featureItemComponent.getElement());
    return featureItemComponent;
}

