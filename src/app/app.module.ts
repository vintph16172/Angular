import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AboutComponent } from './pages/about/about.component';
import { ProductComponent } from './components/product/product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientComponent } from './layouts/client/client.component';
import { AdminComponent } from './layouts/admin/admin.component';


import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzMessageModule } from 'ng-zorro-antd/message';

import { BlogComponent } from './pages/blog/blog.component';
import { WorkComponent } from './pages/work/work.component';
import { PostListComponent } from './components/admin/post/post-list/post-list.component';
import { PostFormComponent } from './components/admin/post/post-form/post-form.component';


// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import axios from 'axios';
import { ProjectFormComponent } from './components/admin/project/project-form/project-form.component';
import { ProjectListComponent } from './components/admin/project/project-list/project-list.component'

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductFormComponent,
    ProductDetailComponent,
    HomeComponent,
    ClientComponent,
    AdminComponent,
    SignupComponent,
    SigninComponent,
    BlogComponent,
    WorkComponent,
    PostListComponent,
    PostFormComponent,
    ProjectFormComponent,
    ProjectListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CKEditorModule,
    
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzGridModule,
    NzIconModule,
    NzDropDownModule,
    NzAlertModule,
    NzBreadCrumbModule,
    NzUploadModule,
    NzAvatarModule,
    NzSelectModule,
    NzMessageModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
