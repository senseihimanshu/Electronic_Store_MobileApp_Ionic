import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumberForString } from '../../utils/isNumber';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
})
export class ProductFormPage implements OnInit {
  productForm: Product;
  formType: 'create' | 'update';

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      (paramMap.get('productId'), isNumberForString);
      if (!paramMap.has('productId')) {
        this.formType = 'create';
        return;
      }

      if (!isNumberForString(paramMap.get('productId'))) {
        this.router.navigate(['/products']);
        return;
      }

      this.formType = 'update';

      const productId = Number(paramMap.get('productId'));

      this.productsService.getProduct(productId.toString()).subscribe((product: Product) => {
        (product);
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
        this.productForm = product;
        (this.productForm, 'productForm');
      });
    })
  }

  onImagePicked(imageData: string) {
    console.log(imageData, 'Image data');
  }
}
