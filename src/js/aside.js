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

