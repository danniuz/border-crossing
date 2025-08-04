import { initMap } from './js/map.ts';
import { initAside } from './js/aside.ts';
import './style.scss'

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initAside({ opened: false });
});