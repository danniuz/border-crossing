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
import { initAutoScrollTop } from './js/auto-scroll-top.js';
import { initFooterHighlightWordAnimation } from './js/footer-highlight-word-animation.js';
import { initMenu } from './js/init-menu.js';
import { initAsideTogglerAccordion } from './js/aside-toggler.js';
import {
  initFullscreenLoader,
  showFullscreenLoader,
  hideFullscreenLoader,
} from './js/loader.js';
import { initNavSearchMenu } from './js/init-nav-search-menu.js';
import { initCustomVideoPauseControlSwiper } from './js/custom-video-pause-control-swiper.js';

const isRtl = document.documentElement.dir === 'rtl';

function loadMap() {
  const map = initMap();

  if (!map) {
    return;
  }
}
initAutoScrollTop();
initAside({ opened: false });
initMenu();
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
  initFadeUp('#safe-area-sm-image-wrapper', { delay: 0.8 });
  initFadeLeft('#safe-area-lg-image-wrapper', { delay: 0 });
  initFadeRight('#safe-area-benefits-list', { delay: 0.5 });
} else {
  initFadeUp('#safe-area-sm-image-wrapper', { delay: 0.8 });
  initFadeRight('#safe-area-lg-image-wrapper', { delay: 0 });
  initFadeLeft('#safe-area-benefits-list', { delay: 0.5 });
}

initLanguageSelector(
  '.footer__language-selector-button',
  '.footer__language-dropdown',
);

initScrollableContentToUrl();

initNavLanguageDropdown();
initHomeStrictTopVideoAnimation();
initFooterHighlightWordAnimation('#footer-animated-title', { delay: 2.5 });

initCustomVideoPauseControl(
  '.long-way-banner',
  '.long-way-banner__clip',
  '.custom-video-stop-button',
);
initCustomVideoPauseControl(
  '.home__strict-top-wrapper',
  '#home-strict-top-video-to-animate',
  '#home-strict-top-video-stop-button',
);

initCustomVideoPauseControlSwiper(
  '#about-fluid-swiper-wrapper',
  '.fluid-swiper__slide-clip',
  '.custom-video-stop-button',
  '.custom-video-mute-button',
);

initNewsSwiperHeaderAnimation();
initManagerCardAnimation();
initPersonalAreaAnimation();

function initPersonalAreaAnimation() {
  initFadeUp('#personal-area-header', { delay: 0.5 });
  initFadeUp('#personal-area-swiper-wrapper', { delay: 1 });
}

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

initAsideTogglerAccordion(
  '.content-aside__toggle-filters',
  '.content-aside__tag-list-wrapper',
);

initFullscreenLoader();
// showFullscreenLoader();
// hideFullscreenLoader();

initNavSearchMenu();
