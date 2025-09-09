export function initNewsSwiper() {
  const newsSwiper = document.querySelector('.news-swiper');

  if (!newsSwiper) {
    return;
  }

  const swiper = new Swiper('.news-swiper', {
      direction: 'horizontal',
      loop: true,
    
      pagination: {
        el: '.news-swiper__swiper-pagination',
        clickable: true,
      },
    
      navigation: {
        nextEl: '.news-swiper__swiper-button-next',
        prevEl: '.news-swiper__swiper-button-prev',
      },
    });
}
