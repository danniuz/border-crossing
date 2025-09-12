import { initMap } from './js/map.js';
import { initAside } from './js/aside.js';
import { initFlashes } from './js/flashes.js';
import { initNewsSwiper } from './js/news-swiper.js';
import { initMarquee } from './js/marquee.js';
import './js/form-interactions.js';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.scss'

function loadMap() {
    const map = initMap();

    if (!map) {
        return;
    }

    // map.on('load', () => {
    //     const wrapper = document.querySelector('#wrapper');

    //     if (wrapper) {
    //         wrapper.classList.add('wrapper--visible');
    //     }
    // }); 

}

initAside({ opened: false });
loadMap();
initMarquee({ start: true });
initFlashes('flashes-faq');
initNewsSwiper();