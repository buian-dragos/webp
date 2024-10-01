import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { BrowseComponent } from './browse/browse.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'delete', component: DeleteProductComponent },
  // Add other routes as needed
];
