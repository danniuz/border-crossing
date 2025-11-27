export function initFluidSwiper(mainSelector, options = {}) {
  const fluidSwiper = document.querySelector(mainSelector);
  const { paginationSelector, nextBtnSelector, prevBtnSelector } = options;

  if (
    !paginationSelector ||
    !nextBtnSelector ||
    !prevBtnSelector ||
    !fluidSwiper
  ) {
    return;
  }

  const slideWrapper = fluidSwiper.querySelector('.swiper-wrapper');

  if (!slideWrapper) {
    return;
  }

  const slides = slideWrapper.querySelectorAll('.swiper-slide');
  const slideCount = slides.length;

  // Clone slides until we have at least 6
  if (slideCount < 6) {
    const originalSlides = Array.from(slides);
    const clonesToAdd = 6 - slideCount;

    for (let i = 0; i < clonesToAdd; i++) {
      const slideToClone = originalSlides[i % slideCount];
      slideWrapper.appendChild(slideToClone.cloneNode(true));
    }
  }

  const swiper = new Swiper(mainSelector, {
    direction: 'horizontal',
    loop: true,
    slidesPerView: '1',
    spaceBetween: 8,
    loopedSlides: 2,
    // watchSlidesProgress: true,
    pagination: {
      el: paginationSelector,
      clickable: true,
    },

    navigation: {
      nextEl: nextBtnSelector,
      prevEl: prevBtnSelector,
    },

    on: {
      init: function () {
        this.slideTo(1, 0);
        console.log('init');
      },
      slideChange: function () {
        console.log('slideChange');
      },
    },

    breakpoints: {
      991: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        loopedSlides: 2,
        loopAdditionalSlides: 2,
        // watchSlidesProgress: true,
      },
    },
  });
}
