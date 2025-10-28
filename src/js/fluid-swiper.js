export function initFluidSwiper(mainSelector, options = {}) {
  const fluidSwiper = document.querySelector(mainSelector);
  const { paginationSelector, nextBtnSelector, prevBtnSelector } = options;

  if (!paginationSelector || !nextBtnSelector || !prevBtnSelector) {
    return;
  }

  if (!fluidSwiper) {
    return;
  }

  const swiper = new Swiper(mainSelector, {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    loopAdditionalSlides: 1,

    pagination: {
      el: paginationSelector,
      clickable: true,
    },

    navigation: {
      nextEl: nextBtnSelector,
      prevEl: prevBtnSelector,
    },
  });
}
