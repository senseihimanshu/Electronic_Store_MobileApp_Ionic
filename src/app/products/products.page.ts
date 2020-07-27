import { Component } from '@angular/core';

import { Product } from './product.model';
import { ProductsService } from './products.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage {
  products: Product[];

  constructor(private productsService: ProductsService) { }

  ionViewWillEnter() {
    this.productsService.getAllProducts().subscribe((products: Product[]) => {
      products.map((product: Product) => {
        if (product.product_type === 'mobile') {
          this.productsService.getMobile(product.id.toString()).subscribe((specs: Product['specs'][]) => {
            product.specs = specs[0];
          })
        }
        if (product.product_type === 'laptop') {
          this.productsService.getLaptop(product.id.toString()).subscribe((specs: Product['specs'][]) => {
            product.specs = specs[0];
          })
        }
      })
      this.products = products;
    }, (err: HttpErrorResponse) => {
    });
  }
}
