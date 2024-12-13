import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { OrderCreateComponent } from './components/order/order-create/order-create.component';

const routes: Routes = [
  { path: 'users/register', component: UserRegisterComponent },
  { path: 'users', component: UserListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'orders/create', component: OrderCreateComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '/', redirectTo: 'products', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
