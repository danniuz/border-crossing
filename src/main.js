import { initMap } from './js/map.js';
import { initAside } from './js/aside.js';
import { FeatureItemComponent } from './js/feature-item-component.js';
import { borderCrossingFeatures } from './js/data/features.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.scss'

const map = initMap();
initAside({ opened: true });

map.on('load', () => {
    const wrapper = document.querySelector('#wrapper');

    if (wrapper) {
        wrapper.classList.add('wrapper--visible');
    }

    initAsideItems();
});

function createAsideItem(feature) {
    const featureItemComponent = new FeatureItemComponent(feature, {
        showImage: true,
        showButton: true,
        className: 'popup--aside-feature-item'
    });

    return featureItemComponent.getElement();
}

function initAsideItems() {
    const asideContent = document.getElementById('aside-feature-list');

    if (!asideContent) return;

    borderCrossingFeatures.forEach(feature => {
        const item = createAsideItem(feature);
        asideContent.appendChild(item);
    });
} 