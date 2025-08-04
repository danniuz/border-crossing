import { initMap } from './ts/map.ts';
import { initAside } from './ts/aside.ts';
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