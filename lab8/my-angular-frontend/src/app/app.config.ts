import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { BrowseComponent } from './browse/browse.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'delete', component: DeleteProductComponent },
  // Add other routes as needed
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
