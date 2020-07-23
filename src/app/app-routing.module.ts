import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule),
      },
      {
        path: ':productId',
        loadChildren: () => import('./products/product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
