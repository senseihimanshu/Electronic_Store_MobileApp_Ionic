import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductFormPageRoutingModule } from './product-form-routing.module';

import { ProductFormPage } from './product-form.page';
import { Product } from '../product.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductFormPageRoutingModule
  ],
  declarations: [ProductFormPage]
})
export class ProductFormPageModule implements OnInit {
  productForm: Product;

  constructor() { }

  ngOnInit() {

  }
}
