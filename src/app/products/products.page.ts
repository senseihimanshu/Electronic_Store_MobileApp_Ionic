import { Component } from '@angular/core';

import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage {
  products: Product[];

  constructor(private productsService: ProductsService) { }

  ionViewWillEnter() {
    this.products = this.productsService.getAllProducts();
  }
}
