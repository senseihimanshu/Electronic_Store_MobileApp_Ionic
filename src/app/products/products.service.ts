import { Injectable } from '@angular/core';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [{
    id: 1,
    name: 'Samsung Galaxy Note',
    image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-note10-plus-aura-glow.jpg',
    description: 'A mobile phone',
    type: 'mobile',
    specs: {
      processor: 'Octa Core',
      ram: '8 GB',
      screenSize: '5"5\'',
      color: 'Carbon Black'
    }
  }, {
    id: 2,
    name: 'Mac Book Pro',
    image: 'https://techcrunch.com/wp-content/uploads/2019/11/MacBook-Pro-16-IMG_2820-1.jpeg',
    description: 'A Laptop',
    type: 'laptop',
    specs: {
      processor: 'Octa Core',
      ram: '16 GB',
      hdCapacity: 'XYZ'
    }
  }];

  constructor() { }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProduct(id: number): Product {
    return {
      ...this.products.find((product: Product) => {
        return id === product.id;
      })
    };
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((product: Product) => {
      return product.id !== id;
    });
  }
}
