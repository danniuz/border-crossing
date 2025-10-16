/**
 * @param {Object} params
 * @param {boolean} params.opened
 */
export function initScrollToTop(selector, offset) {
    const scrollToTop = document.querySelector(selector);

    if (!scrollToTop) {
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > offset) {
            scrollToTop.classList.add('scroll-to-top--visible');
        } else {
            scrollToTop.classList.remove('scroll-to-top--visible');
        }
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

