import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { HomePageComponent } from './home-page/home-page.component';

import { CompanyService } from './services/company.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    NewCompanyComponent,
    HomePageComponent
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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
