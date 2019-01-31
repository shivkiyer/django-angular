import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { environment } from './../../environments/environment';
import { CSRFManagerService } from './../services/csrf-manager.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  apiBaseURL = environment.configSettings.apiURL;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private csrfManagerService: CSRFManagerService
  ) {}

  ngOnInit() {
    this.http.get(
      this.apiBaseURL,
      {
        observe: 'response'
      }
    ).subscribe(
      response => {
        if (!this.csrfManagerService.getToken()) {
          this.csrfManagerService.setToken(this.cookieService.get('csrftoken'));
        }
        console.log(this.cookieService.get('csrftoken'));
        console.log(this.csrfManagerService.getToken());
      },
      errors => {
        console.log(errors);
      }
    )
  }

}
