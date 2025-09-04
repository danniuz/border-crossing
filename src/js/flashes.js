/**
 * @param {Object} params
 * @param {boolean} params.opened
 */
export function initFlashes(id) {
    const flashesWrapper = document.getElementById(id);

    if (!flashesWrapper) {
        return;
    }

    const flashesFaq = flashesWrapper.querySelectorAll('.faq__item');

    flashesFaq.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('faq__item--opened');
        });
    });
}

