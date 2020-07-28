import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumberForString } from '../../utils/isNumber';
import { AlertController } from '@ionic/angular';

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

  // Used for deleting data after update if changes and create, else patch
  productType: Product['product_type'];

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router, private alertController: AlertController) { }

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
        this.image = product.image;
        this.productType = product.product_type;
        this.productForm = product;
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

  onSubmit(product: any): void {
    if (this.image instanceof Blob) {
      var imageFile = new File([this.image], `${Date.now()}.jpg`);
    }
    console.log(this.image, 'THIS.IMAGE', imageFile);
    if (this.formType === 'create') {
      this.productsService.createProduct({ name: product.name, description: product.description, image: imageFile, product_type: product.product_type }).subscribe((res: any) => {
        console.log(res, 'Response');
        const productId = res.id;
        if (product.product_type === 'mobile') {
          this.productsService.createMobile({ product: productId, processor: product.processor, ram: product.ram, screen_size: product.screen_size, color: product.color }).subscribe((res: any) => {
            console.log(res, 'RESPONSE INSIDE');
            this.alertController.create({
              header: 'Created Successfully.',
              message: 'Product created successfully',
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            }).then(alertEl => {
              alertEl.present();
            });;
          })
        }
        if (product.product_type === 'laptop') {
          this.productsService.createLaptop({ product: productId, processor: product.processor, ram: product.ram, hd_capacity: product.hd_capacity }).subscribe((res: any) => {
            console.log(res, 'RESPONSE INSIDE');
            this.alertController.create({
              header: 'Created Successfully.',
              message: 'Product created successfully',
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            }).then(alertEl => {
              alertEl.present();
            });;
          })
        }
      });
    }

    if (this.formType === 'update') {
      console.log(imageFile, 'imageFile');
      this.productsService.updateProduct({ name: product.name, description: product.description, image: imageFile, product_type: product.product_type }, this.productForm.id.toString()).subscribe((res: any) => {
        console.log(res, 'Response', this.productType, 'this.productType');
        const productId = res.id;
        if (this.productType !== product.product_type) {
          if (product.product_type === 'mobile') {
            this.productsService.createMobile({ product: productId, processor: product.processor, ram: product.ram, screen_size: product.screen_size, color: product.color }).subscribe((res: any) => {
              console.log(res, 'RESPONSE INSIDE');
            });

            this.productsService.getLaptop(productId).subscribe((res: any) => {
              console.log(res, 'RESPONSE INSIDE Get Mobile');
              const laptopId = res[0].id;
              this.productsService.deleteLaptop(laptopId).subscribe((res: any) => {
                console.log(res, 'RESPONSE INSIDE');
                this.alertController.create({
                  header: 'Updated Successfully.',
                  message: 'Product updated successfully',
                  buttons: [{
                    text: 'Ok',
                    role: 'cancel'
                  }]
                }).then(alertEl => {
                  alertEl.present();
                });;
              });
            });
          }
          if (product.product_type === 'laptop') {
            this.productsService.createLaptop({ product: productId, processor: product.processor, ram: product.ram, hd_capacity: product.hd_capacity }).subscribe((res: any) => {
              console.log(res, 'RESPONSE INSIDE');
            });

            this.productsService.getMobile(productId).subscribe((res: any) => {
              console.log(res, 'RESPONSE INSIDE Get Mobile');
              const mobileId = res[0].id;
              this.productsService.deleteMobile(mobileId).subscribe((res: any) => {
                console.log(res, 'RESPONSE INSIDE');
                this.alertController.create({
                  header: 'Updated Successfully.',
                  message: 'Product updated successfully',
                  buttons: [{
                    text: 'Ok',
                    role: 'cancel'
                  }]
                }).then(alertEl => {
                  alertEl.present();
                });;
              });
            });
          }
        }
        else {
          if (product.product_type === 'mobile') {
            this.productsService.getMobile(productId).subscribe((res: any) => {
              console.log(res, 'RESPONSE INSIDE Get Mobile');
              const mobileId = res[0].id;
              this.productsService.updateMobile({ processor: product.processor, ram: product.ram, screen_size: product.screen_size, color: product.color, product: productId }, mobileId).subscribe((res: any) => {
                console.log(res, 'RESPONSE INSIDE');
                this.alertController.create({
                  header: 'Updated Successfully.',
                  message: 'Product updated successfully',
                  buttons: [{
                    text: 'Ok',
                    role: 'cancel'
                  }]
                }).then(alertEl => {
                  alertEl.present();
                });;
              })
            });
          }
          if (product.product_type === 'laptop') {
            this.productsService.getLaptop(productId).subscribe((res: any) => {
              console.log(res, 'RESPONSE INSIDE Get laptop');
              const laptopId = res[0].id;
              this.productsService.updateLaptop({ processor: product.processor, ram: product.ram, hd_capacity: product.hd_capacity, product: productId }, laptopId).subscribe((res: any) => {
                console.log(res, 'RESPONSE INSIDE');
                this.alertController.create({
                  header: 'Updated Successfully.',
                  message: 'Product updated successfully',
                  buttons: [{
                    text: 'Ok',
                    role: 'cancel'
                  }]
                }).then(alertEl => {
                  alertEl.present();
                });;
              })
            });
          }
        }
      });
    }
    this.router.navigateByUrl('/products');
  }
}
