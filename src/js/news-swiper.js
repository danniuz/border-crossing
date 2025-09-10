export function initNewsSwiper() {
  const newsSwiper = document.querySelector('#news-swiper');

  if (!newsSwiper) {
    return;
  }

  const swiper = new Swiper('#news-swiper', {
    direction: 'horizontal',
    loop: true,

    pagination: {
      el: '#news-swiper-swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '#news-swiper-button-next',
      prevEl: '#news-swiper-button-prev',
    },
  });
}
