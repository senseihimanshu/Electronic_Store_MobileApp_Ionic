import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { PreventLoginService as PreventLoginGuard } from './services/prevent-login.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [PreventLoginGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule),
      },
      {
        path: 'new',
        loadChildren: () => import('./products/product-form/product-form.module').then(m => m.ProductFormPageModule)
      },
      {
        path: 'edit/:productId',
        loadChildren: () => import('./products/product-form/product-form.module').then(m => m.ProductFormPageModule)
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
