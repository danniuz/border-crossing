import { initMap } from './js/map.js';
import { initAside } from './js/aside.js';
import { initAccordion } from './js/accordion.js';
import { initNewsSwiper } from './js/news-swiper.js';
import { initMarquee } from './js/marquee.js';
import { initScrollToTop } from './js/scroll-to-top.js';
import './js/form-interactions.js';
import { initPlacePopup } from './js/place-popup.js';
import { initStairsGallery } from './js/stairs-gallery.js';
import { initFluidSwiper } from './js/fluid-swiper.js';
import { initTextSwiper } from './js/text-swiper.js';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.scss';

function loadMap() {
  const map = initMap();

  if (!map) {
    return;
  }
}


initAside({ opened: true });
loadMap();
initMarquee({ start: true });
initAccordion('#flashes-faq', 'faq__item', 'faq__item--opened');
initAccordion(
  '#manager-speech-statement-list',
  'manager-speech__statement-item',
  'manager-speech__statement-item--opened',
  {
    avoidEventBubbleClasses: ['manager-speech__statement-item-link'],
  },
);
initNewsSwiper();
initScrollToTop('#scroll-to-top', 500);
initPlacePopup();
initStairsGallery();

initFluidSwiper('#about-us-swiper', {
  paginationSelector: '#fluid-swiper-swiper-pagination',
  nextBtnSelector: '#fluid-swiper-button-next',
  prevBtnSelector: '#fluid-swiper-button-prev',
});


initTextSwiper('#about-text-swiper', {
  paginationSelector: '#about-text-swiper-pagination',
});