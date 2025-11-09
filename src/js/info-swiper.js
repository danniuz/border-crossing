export function initInfoSwiper() {
  const infoSwiper = document.querySelector('#info-swiper');

  if (!infoSwiper) {
    return;
  }

  const swiper = new Swiper('#info-swiper', {
    direction: 'horizontal',
    loop: true,

    pagination: {
      el: '#info-swiper-swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '#info-swiper-button-next',
      prevEl: '#info-swiper-button-prev',
    },
  });
}
