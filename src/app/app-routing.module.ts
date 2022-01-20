import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { RegisterComponent } from './register/register.component';
import { AuthGaurdService } from './shared/auth-gaurd.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'product',
    component: ProductComponent,
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'view-product',
    component: ViewProductComponent,
  },
  { path: 'about', component: AboutComponent, canActivate: [AuthGaurdService] },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'order',
    component: OrdersComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
