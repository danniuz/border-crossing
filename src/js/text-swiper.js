export function initTextSwiper(mainSelector, options = {}) {
  const fluidSwiper = document.querySelector(mainSelector);
  const { paginationSelector } = options;

  if (!paginationSelector) {
    return;
  }

  if (!fluidSwiper) {
    return;
  }

  const swiper = new Swiper(mainSelector, {
    direction: 'horizontal',

    pagination: {
      el: paginationSelector,
      clickable: true,
    },
  });
}
