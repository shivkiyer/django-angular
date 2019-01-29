import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';

import { CookieManager } from './cookie-manager.service';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  apiBaseURL = environment.configSettings.apiURL;
  csrfToken: string;

  registerUser(userInfo: any) {
    this.csrfToken = CookieManager.csrfToken;
    let headers = new HttpHeaders({
      'X-Csrftoken': this.csrfToken,
      'Content-Type': 'application/json'
    });
    return this.http.post(
      this.apiBaseURL + 'user/',
      userInfo.value,
      {headers: headers}
    );
  }

  loginUser(userInfo: any) {
    this.csrfToken = CookieManager.csrfToken;
    let headers = new HttpHeaders({
      'X-Csrftoken': this.csrfToken,
      'Content-Type': 'application/json'
    });
    return this.http.post(
      this.apiBaseURL + 'user/login/',
      userInfo.value,
      {
        headers: headers,
        observe: 'response'
      },
    );
  }
}
