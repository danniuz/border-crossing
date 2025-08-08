import { initMap } from './js/map.js';
import { initAside } from './js/aside.js';
import { borderCrossingFeatures } from './js/data/features.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.scss'

const map = initMap();
initAside({ opened: false });

map.on('load', () => {
    const wrapper = document.querySelector('#wrapper');

    if (wrapper) {
        wrapper.classList.add('wrapper--visible');
    }
}); 