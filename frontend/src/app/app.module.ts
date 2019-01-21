import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NewCompanyComponent } from './new-company/new-company.component';

import { CompanyService } from './services/company.service';


@NgModule({
  declarations: [
    AppComponent,
    NewCompanyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    CookieService,
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
