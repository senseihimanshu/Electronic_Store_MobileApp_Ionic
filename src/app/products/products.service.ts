import { Injectable } from '@angular/core';

import { Product } from './product.model';
import { HOST } from '../config/apiHost.config';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

const PRODUCT_API = `${HOST}/product/`;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // private products: Product[] = [{
  //   id: 1,
  //   name: 'Samsung Galaxy Note',
  //   image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-note10-plus-aura-glow.jpg',
  //   description: 'A mobile phone',
  //   type: 'mobile',
  //   specs: {
  //     processor: 'Octa Core',
  //     ram: '8 GB',
  //     screenSize: '5"5\'',
  //     color: 'Carbon Black'
  //   }
  // }, {
  //   id: 2,
  //   name: 'Mac Book Pro',
  //   image: 'https://techcrunch.com/wp-content/uploads/2019/11/MacBook-Pro-16-IMG_2820-1.jpeg',
  //   description: 'A Laptop',
  //   type: 'laptop',
  //   specs: {
  //     processor: 'Octa Core',
  //     ram: '16 GB',
  //     hdCapacity: 'XYZ'
  //   }
  // }];

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_API);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(PRODUCT_API + id + '/');
  }

  getMobile(productId: string): Observable<any> {
    const params = new HttpParams().set('product', productId);
    return this.http.get<any>(PRODUCT_API + 'mobile/', { ...params });
  }

  getLaptop(productId: string): Observable<any> {
    const params = new HttpParams().set('product', productId);
    return this.http.get<any>(PRODUCT_API + 'laptop/', { ...params });
  }

  // deleteProduct(id: number): void {
  //   this.products = this.products.filter((product: Product) => {
  //     return product.id !== id;
  //   });
  // }
}
