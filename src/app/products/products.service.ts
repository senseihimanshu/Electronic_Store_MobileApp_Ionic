import { Injectable } from '@angular/core';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [{
    id: 1,
    name: 'Samsung Galaxy Note',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Findianexpress.com%2Farticle%2Ftechnology%2Ftech-reviews%2Fsamsung-galaxy-note-10-quick-review-5929032%2F&psig=AOvVaw1iiIQ3nu3IR2MsRvF3yYBc&ust=1595544847376000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjjqPL54eoCFQAAAAAdAAAAABAD',
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
    console.log(this.products);
    return [...this.products];
  }

  getProduct(id: number): Product {
    return {
      ...this.products.find((product: Product) => {
        return id === product.id;
      })
    };
  }
}
