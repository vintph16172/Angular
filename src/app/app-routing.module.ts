import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { ProductComponent } from './components/product/product.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

import { AdminComponent } from './layouts/admin/admin.component';
import { ClientComponent } from './layouts/client/client.component';

import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkComponent } from './pages/work/work.component';

import { AdminGuard } from './services/guards/admin.guard';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
  // { path: "", component: HomeComponent },
  // { path: "about", component: AboutComponent },
  // {
  //   path: "product", canActivate: [AdminGuard], children: [
  //     { path: "", redirectTo: 'list', pathMatch: 'full' },
  //     { path: 'list', component: ProductComponent },
  //     { path: "add", component: ProductAddComponent },
  //     { path: ":id", component: ProductDetailComponent },
  //     { path: "edit/:id", component: ProductAddComponent },
  //   ]
  // },
  {
    path: "", component: ClientComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "about", component: AboutComponent },
      { path: "blog", component: BlogComponent },
      { path: "work", component: WorkComponent },
    ]
  },
  { path: "signup", component: SignupComponent },
  { path: "signin", component: SigninComponent },

  {
    path: "admin", canActivate: [AdminGuard], component: AdminComponent,
    children: [
      // {
      //   path: "products",
      //   children: [
      //     { path: "", component: ProductComponent },
      //     { path: '?_name=:search', component: ProductEditComponent },
      //     { path: 'form', component: ProductFormComponent },
      //     { path: 'form/:id', component: ProductFormComponent },
      //     { path: "add", component: ProductAddComponent },
      //     { path: ':id', component: ProductDetailComponent },
      //     { path: ':id/edit', component: ProductEditComponent },

      //   ]

      // },
      {
        path: "products", children: [
          { path: "", redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ProductComponent },
          { path: "add", component: ProductFormComponent },
          { path: ":id", component: ProductDetailComponent },
          { path: "edit/:id", component: ProductFormComponent },
        ]
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
