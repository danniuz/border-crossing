export interface Statuses {
    pedestrians: boolean;
    vehicles: boolean;
    merchandise: boolean;
}

export interface BorderCrossingProperties {
    title: string;
    area: string;
    lobbyImage: string;
    addressDescription: string;
    phoneNumber: string;
    statuses: Statuses;
}

export interface BorderCrossingGeometry {
    type: 'Point';
    coordinates: [number, number];
}