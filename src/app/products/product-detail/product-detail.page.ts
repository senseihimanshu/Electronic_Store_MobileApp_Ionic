import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  loadedProduct: Product;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productsService: ProductsService, private alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('productId')) {
        this.router.navigate(['/products']);
        return;
      }

      const productId = Number(paramMap.get('productId'));

      this.loadedProduct = this.productsService.getProduct(productId);
    })
  }

  onDelete(): void {
    this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete this product',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Delete',
        handler: () => {
          this.productsService.deleteProduct(this.loadedProduct.id);
          this.router.navigate(['/products']);
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
