import { Component, OnInit, Input } from '@angular/core';
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

      this.productsService.getProduct(productId.toString()).subscribe((product: Product) => {
        (product);
        if (product.product_type === 'mobile') {
          this.productsService.getMobile(product.id.toString()).subscribe((specs: Product['specs']) => {
            product.specs = specs[0];
          })
        }
        if (product.product_type === 'laptop') {
          this.productsService.getLaptop(product.id.toString()).subscribe((specs: Product['specs']) => {
            product.specs = specs[0];
          })
        }
        this.loadedProduct = product;
        (this.loadedProduct, 'loadedProduct');
      });
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
          this.productsService.deleteProduct(this.loadedProduct.id).subscribe(() => {
            this.alertController.create({
              header: 'Deleted Successfully.',
              message: 'Product deleted successfully',
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            });
          });
          this.router.navigate(['/products']);
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
