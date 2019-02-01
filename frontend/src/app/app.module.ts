import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterBoxComponent } from './register-box/register-box.component';
import { LoginBoxComponent } from './login-box/login-box.component';
import { PageHeaderComponent } from './page-sections/page-header/page-header.component';

import { CompanyService } from './services/company.service';
import { UserService } from './services/user.service';
import { CSRFManagerService } from './services/csrf-manager.service';
import { UserAuthService } from './services/user-auth.service';


@NgModule({
  declarations: [
    AppComponent,
    NewCompanyComponent,
    HomePageComponent,
    RegisterBoxComponent,
    LoginBoxComponent,
    PageHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    CookieService,
    CompanyService,
    UserService,
    CSRFManagerService,
    UserAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
