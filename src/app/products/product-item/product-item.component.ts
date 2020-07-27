import { Component, OnInit, Input } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input()
  product: Product;

  constructor(private router: Router) { }

  ngOnInit() { }

  onEdit(productId: number, slidingElement: IonItemSliding): void {
    this.router.navigateByUrl(`/products/edit/${productId}`);
    slidingElement.close();
  }
}
