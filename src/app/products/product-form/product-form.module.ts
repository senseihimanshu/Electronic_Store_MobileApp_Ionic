import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductFormPageRoutingModule } from './product-form-routing.module';
import { ProductFormPage } from './product-form.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductFormPageRoutingModule
  ],
  declarations: [ProductFormPage]
})
export class ProductFormPageModule {

}
