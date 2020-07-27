import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductFormPageRoutingModule } from './product-form-routing.module';
import { ProductFormPage } from './product-form.page';
import { ImagePickerComponent } from '../../shared/pickers/image-picker/image-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductFormPageRoutingModule
  ],
  declarations: [ProductFormPage, ImagePickerComponent]
})
export class ProductFormPageModule { }
