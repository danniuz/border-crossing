export function initTextSwiper(mainSelector, itemClass, options = {}) {
  const fluidSwiper = document.querySelector(mainSelector);
  const {
    paginationSelector,
    worksMaxWidth = 0,
    imageSelector = null,
  } = options;

  if (worksMaxWidth && window.innerWidth >= worksMaxWidth) {
    return;
  }

  if (!paginationSelector) {
    return;
  }

  if (!fluidSwiper) {
    return;
  }

  const imageElement = imageSelector
    ? document.querySelector(imageSelector)
    : null;

  function updateImageWithTransition(imgElement, newSrc) {
    imgElement.classList.remove('fade-in');
    imgElement.classList.add('fade-out');

    setTimeout(() => {
      imgElement.src = newSrc;
      imgElement.onload = () => {
        imgElement.classList.remove('fade-out');
        imgElement.classList.add('fade-in');
        setTimeout(() => {
          imgElement.classList.remove('fade-in');
        }, 200);
      };
      if (imgElement.complete) {
        imgElement.onload();
      }
    }, 200);
  }

  const swiper = new Swiper(mainSelector, {
    direction: 'horizontal',

    pagination: {
      el: paginationSelector,
      clickable: true,
    },

    navigation: {
      nextEl: '.text-swiper-next',
      prevEl: '.text-swiper-prev',
    },

    on: {
      init: function () {
        if (imageElement) {
          const activeSlide = this.slides[this.activeIndex];
          const activeItem = activeSlide?.querySelector(`.${itemClass}`);
          if (activeItem) {
            const imgSrc = activeItem.getAttribute('data-img-src');
            if (imgSrc) {
              imageElement.src = imgSrc;
            }
          }
        }
      },
      slideChange: function () {
        if (imageElement) {
          const activeSlide = this.slides[this.activeIndex];
          const activeItem = activeSlide?.querySelector(`.${itemClass}`);
          if (activeItem) {
            const imgSrc = activeItem.getAttribute('data-img-src');
            if (imgSrc && imageElement.src !== imgSrc) {
              updateImageWithTransition(imageElement, imgSrc);
            }
          }
        }
      },
    },
  });
}
