/**
 * @typedef {Object} FeatureItemComponentOptions
 * @property {boolean} [showImage=true]
 * @property {boolean} [showButton=true]
 * @property {string} [className]
 */

export class FeatureItemComponent {
    /**
     * @param {import('./data/features.js').Feature} feature
     * @param {FeatureItemComponentOptions} [options={}]
     */
    constructor(feature, options = {}) {
        this.feature = feature;
        this.options = {
            showImage: true,
            showButton: true,
            ...options
        };
        this.element = this.createFeatureItem();
    }

    createFeatureItem() {
        const popup = document.createElement('div');
        popup.className = `popup ${this.options.className || ''}`;

        const content = document.createElement('div');
        content.className = 'popup__content';

        const region = document.createElement('p');
        region.className = 'popup__region text-xs';
        region.textContent = this.feature.properties.area;
        content.appendChild(region);

        const title = document.createElement('h2');
        title.className = 'popup__title';
        title.textContent = this.feature.properties.title;
        content.appendChild(title);

        const address = document.createElement('p');
        address.className = 'popup__address text-s';

        const locationIcon = document.createElement('img');
        locationIcon.src = 'icons/location.svg';
        locationIcon.className = 'popup__address-icon';
        locationIcon.alt = 'Location';

        address.appendChild(locationIcon);
        address.appendChild(document.createTextNode(this.feature.properties.addressDescription));
        content.appendChild(address);

        const contact = document.createElement('p');
        contact.className = 'popup__contact text-s';

        const callIcon = document.createElement('img');
        callIcon.src = 'icons/call.svg';
        callIcon.className = 'popup__contact-icon';
        callIcon.alt = 'Phone';

        contact.appendChild(callIcon);
        contact.appendChild(document.createTextNode(this.feature.properties.phoneNumber));
        content.appendChild(contact);

        const statusList = document.createElement('div');
        statusList.className = 'popup__status-list';

        const statuses = [
            { key: 'pedestrians', label: 'הולכי רגל' },
            { key: 'vehicles', label: 'כלי רכב' },
            { key: 'merchandise', label: 'סחורות' }
        ];

        statuses.forEach(({ key, label }) => {
            const status = document.createElement('div');
            status.className = 'popup__status';

            const indicator = document.createElement('span');
            indicator.className = `popup__status-indicator ${this.feature.properties.statuses[key] ? 'popup__status-indicator--active' : ''}`;

            status.appendChild(indicator);
            status.appendChild(document.createTextNode(label));
            statusList.appendChild(status);
        });

        content.appendChild(statusList);

        if (this.options.showButton) {
            const button = document.createElement('button');
            button.className = 'popup__button';

            const buttonIcon = document.createElement('img');
            buttonIcon.src = 'icons/arrow-up-left.svg';
            buttonIcon.className = 'popup__button-icon';
            buttonIcon.alt = 'Arrow Up Left';

            button.appendChild(buttonIcon);
            content.appendChild(button);
        }

        popup.appendChild(content);

        if (this.options.showImage) {
            const image = document.createElement('img');
            image.className = 'popup__image';
            image.src = this.feature.properties.lobbyImage;
            image.alt = this.feature.properties.title;
            popup.appendChild(image);
        }

        return popup;
    }

    getElement() {
        return this.element;
    }

    getHTML() {
        return this.element.outerHTML;
    }
}

/**
 * @param {import('./data/features.js').Feature} feature
 * @returns {string}
 */
export function getPopupTemplate(feature) {
    const featureItemComponent = new FeatureItemComponent(feature);
    return featureItemComponent.getHTML();
} 