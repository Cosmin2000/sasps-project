import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { OrderCreateComponent } from './components/order/order-create/order-create.component';
import { AuthGuard } from './guards/auth.guard'
const routes: Routes = [
  { path: 'users/register', component: UserRegisterComponent },
  { path: 'users', component: UserListComponent },
  { path: 'products', component: ProductListComponent},
  { path: 'dashboard', component: ProductListComponent},
  { path: 'orders/create', component: OrderCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/login' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
