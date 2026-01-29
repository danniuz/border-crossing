export function initWorldBenefitsSwiper(mainSelector, options = {}) {
  const fluidSwiper = document.querySelector(mainSelector);
  const { paginationSelector, worksMaxWidth = 0 } = options;

  if (worksMaxWidth && window.innerWidth >= worksMaxWidth) {
    return;
  }

  if (!paginationSelector) {
    return;
  }

  if (!fluidSwiper) {
    return;
  }

  const swiper = new Swiper(mainSelector, {
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 16,
    pagination: {
      el: paginationSelector,
      clickable: true,
    },

    navigation: {
      nextEl: '#world-benefits-swiper-button-next',
      prevEl: '#world-benefits-swiper-button-prev',
    },
  });
}
