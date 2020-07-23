interface Mobile {
    processor: string;
    ram: string;
    screenSize: string;
    color: string;
}

interface Laptop {
    processor: string;
    ram: string;
    hdCapacity: string;
}

export interface Product {
    id?: number;
    name: string;
    image: string;
    description: string;
    type: 'mobile' | 'laptop';
    specs: Mobile | Laptop;
}
