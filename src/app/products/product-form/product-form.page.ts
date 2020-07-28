import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumberForString } from '../../utils/isNumber';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
})
export class ProductFormPage implements OnInit {
  productForm: Product;
  formType: 'create' | 'update';
  image: Blob;

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

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {

        return;
      }
    } else {
      imageFile = imageData;
    }

    this.image = imageFile;
  }
}
