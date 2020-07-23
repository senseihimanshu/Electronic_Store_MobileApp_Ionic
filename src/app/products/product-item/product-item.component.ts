import { Component, OnInit, Input } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input()
  product: Product;

  constructor() { }

  ngOnInit() { }

  onEdit(productId: number, slidingElement: IonItemSliding): void {
    slidingElement.close();
    console.log(productId);
  }
}
