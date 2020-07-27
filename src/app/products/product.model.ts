interface Mobile {
    processor: string;
    ram: string;
    screen_size: string;
    color: string;
}

interface Laptop {
    processor: string;
    ram: string;
    hd_capacity: string;
}

interface MobileOrLaptop extends Mobile, Laptop { }

export interface Product {
    id?: number;
    name: string;
    image: string;
    description: string;
    product_type: 'mobile' | 'laptop';
    specs: MobileOrLaptop;
    created_on: Date;
}
