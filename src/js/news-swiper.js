export function initNewsSwiper() {
  const newsSwiper = document.querySelector('.news-swiper');

  if (!newsSwiper) {
    return;
  }

  const swiper = new Swiper('.news-swiper', {
      direction: 'horizontal',
      loop: true,
    
      pagination: {
        el: '.swiper-pagination',
      },
    
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
}
