import { initMap } from './ts/map.ts';
import { initAside } from './ts/aside.ts';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.scss'

initMap();
initAside({ opened: false });