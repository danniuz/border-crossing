
export interface Location {
    road: number;
    junction: string;
    direction: string;
}

export interface Contact {
    phone: string;
}

export interface Statuses {
    pedestrians: boolean;
    vehicles: boolean;
    goods: boolean;
}

export interface BorderCrossingProperties {
    region: string;
    name: string;
    image: string;
    location: Location;
    contact: Contact;
    statuses: Statuses;
}

export interface BorderCrossingGeometry {
    type: 'Point';
    coordinates: [number, number];
}