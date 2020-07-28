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
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_API);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(PRODUCT_API + id + '/');
  }

  getMobile(productId: string): Observable<any> {
    const params = new HttpParams().set('product', productId);
    return this.http.get<any>(PRODUCT_API + 'mobile/', { params });
  }

  getLaptop(productId: string): Observable<any> {
    const params = new HttpParams().set('product', productId);
    return this.http.get<any>(PRODUCT_API + 'laptop/', { params });
  }

  createProduct(product: Product): Observable<any> {
    var formData = new FormData();
    for (var key in product) {
      formData.append(key, product[key]);
    }

    return this.http.post<any>(PRODUCT_API, formData);
  }

  createMobile(mobile: any): Observable<any> {
    return this.http.post<any>(PRODUCT_API + 'mobile/', mobile);
  }

  createLaptop(laptop: any): Observable<any> {
    return this.http.post<any>(PRODUCT_API + 'laptop/', laptop);
  }

  updateProduct(product: Product, productId: string): Observable<any> {
    var formData = new FormData();
    for (var key in product) {
      formData.append(key, product[key]);
    }

    return this.http.put<any>(`${PRODUCT_API}${productId}/`, formData);
  }

  updateMobile(mobile: any, mobileId: string): Observable<any> {
    return this.http.put<any>(`${PRODUCT_API}mobile/${mobileId}/`, mobile);
  }

  updateLaptop(laptop: any, laptopId: string): Observable<any> {
    return this.http.put<any>(`${PRODUCT_API}laptop/${laptopId}/`, laptop);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(PRODUCT_API + id + '/');
  }

  deleteMobile(mobileId: string): Observable<any> {
    return this.http.delete<any>(`${PRODUCT_API}mobile/${mobileId}/`);
  }

  deleteLaptop(laptopId: string): Observable<any> {
    return this.http.delete<any>(`${PRODUCT_API}laptop/${laptopId}/`);
  }
}
