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
import { initWorldBenefitsSwiper } from './js/world-benefits-swiper.js';
import { initInfoSwiper } from './js/info-swiper.js';
import { initInfographListAnimation } from './js/infograph-list-animation.js';
import { initAutoScrollAccordion } from './js/auto-scroll-accordion.js';
import { initFadeUp } from './js/fade-up-gsap.js';
import { initMapPopup } from './js/map-popup.js';
import { initVideoPopup } from './js/video-popup.js';
import { initLanguageSelector } from './js/language-selector.js';
import { initHomeStrictTopVideoAnimation } from './js/home-strict-top-video-animation.js';
import { initScrollableContentToUrl } from './js/scrollable-content-to-url.js';
import { initNavLanguageDropdown } from './js/nav-language-dropdown.js';
import { initCustomVideoPauseControl } from './js/custom-video-pause-control.js';
import { initFadeLeft } from './js/fade-left-gsap.js';
import { initFadeRight } from './js/fade-right-gsap.js';
import { initAutoScrollTop } from "./js/auto-scroll-top.js";

const isRtl = document.documentElement.dir === 'rtl';

function loadMap() {
  const map = initMap();

  if (!map) {
    return;
  }
}
initAutoScrollTop();
initAside({ opened: false });
loadMap();
initMarquee({ start: true });
initAccordion('#flashes-faq', 'faq__item', 'faq__item--opened', {
  avoidEventBubbleClasses: ['faq__item-link-list-item'],
  singleOpened: true,
  firstOpened: true,
});
initAutoScrollAccordion(
  '#manager-speech-statement-list',
  'manager-speech__statement-item',
  'manager-speech__statement-item--opened',
  {
    avoidEventBubbleClasses: ['manager-speech__statement-item-link'],
    worksMinWidth: 980,
    enableScrollTrigger: true,
    scrollBoxHeight: 200,
    imageSelector: '#manager-speech-img',
    // hitBoxHelper: true,
  },
);
initNewsSwiper();
initInfoSwiper();
initScrollToTop('#scroll-to-top', 500);
initPlacePopup();
initStairsGallery();
initMapPopup();
initVideoPopup();

initFluidSwiper('#about-us-swiper', {
  paginationSelector: '#fluid-swiper-swiper-pagination',
  nextBtnSelector: '#fluid-swiper-button-next',
  prevBtnSelector: '#fluid-swiper-button-prev',
});

initTextSwiper(
  '#manager-speech-statement-list',
  'manager-speech__statement-item',
  {
    paginationSelector: '#about-text-swiper-pagination',
    worksMaxWidth: 980,
    imageSelector: '#manager-speech-img',
  },
);

initWorldBenefitsSwiper('#world-benefits-list', {
  paginationSelector: '#world-benefits-swiper-pagination',
  worksMaxWidth: 980,
});
initInfographListAnimation();

initFadeUp('#about-fluid-swiper-wrapper');
initFadeUp('.fade-up-base');


if (isRtl) {
  initFadeUp('#safe-area-sm-image-wrapper');
  initFadeLeft('#safe-area-lg-image-wrapper', { delay: 0.5 });
  initFadeRight('#safe-area-benefits-list', { delay: 0.8 });
} else {
  initFadeUp('#safe-area-sm-image-wrapper');
  initFadeRight('#safe-area-lg-image-wrapper', { delay: 0.5 });
  initFadeLeft('#safe-area-benefits-list', { delay: 0.8 });
}

initLanguageSelector(
  '.footer__language-selector-button',
  '.footer__language-dropdown',
);

initScrollableContentToUrl();

initNavLanguageDropdown();
initHomeStrictTopVideoAnimation();

initCustomVideoPauseControl('.long-way-banner', '.long-way-banner__clip', '.custom-video-stop-button');
initCustomVideoPauseControl('.home__strict-top-wrapper','#home-strict-top-video-to-animate', '#home-strict-top-video-stop-button');

initNewsSwiperHeaderAnimation();
initManagerCardAnimation();


function initManagerCardAnimation() {
  initFadeUp('#manager-speech-header', { delay: 0.5 });
  initFadeUp('#manager-card-swiper-wrapper', { delay: 0.8 });
  initFadeUp('#manager-card-image-wrapper', { delay: 0.8 });
  initFadeUp('#manager-card-under-image', { delay: 1 });
}

function initNewsSwiperHeaderAnimation() {
  initFadeUp('#news-swiper-header', { delay: 0.5 });
  initFadeUp('#news-swiper', { delay: 0.8 });
  initFadeUp('#news-swiper-image-wrapper', { delay: 0.8 });
  initFadeUp('#news-swiper-card', { delay: 1 });
}