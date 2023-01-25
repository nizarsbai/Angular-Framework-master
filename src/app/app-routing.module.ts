import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {ProductsComponent} from "./products/products.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthentificationGuard} from "./guards/authentification.guard";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

const routes: Routes = [

  {
    path:"login",component: LoginComponent
  },
  {
    path:"",component: LoginComponent
  },
  {
    path:"admin",component: AdminTemplateComponent,children : [
      {
        path:"customers",component:CustomersComponent
      },
      {
        path:"products",component: ProductsComponent
      }
      ,
      {
        path:"new-product",component: NewProductComponent
      }
      ,
      {
        path:"edit-product/:id",component: EditProductComponent
      }

    ],canActivate: [AuthentificationGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
