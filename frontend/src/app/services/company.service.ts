import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';

import { CSRFManagerService } from './csrf-manager.service';
import { UserAuthService } from './user-auth.service';

@Injectable()
export class CompanyService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private csrfManagerService: CSRFManagerService,
    private userAuthService: UserAuthService
  ) {}

  apiBaseURL = environment.configSettings.apiURL;

  fetchCompanyList(): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': this.userAuthService.getJWTToken(),
      'Content-Type': 'application/json'
    })
    return this.http.get(this.apiBaseURL + 'new-company/',
        {
          headers: headers,
          withCredentials: true
        }
      ).pipe(
        map(
          (response) => {
            if (!this.csrfManagerService.getToken()) {
              this.csrfManagerService.setToken(this.cookieService.get('csrftoken'));
            }
            return response;
          }
      ));
  }

  addCompany(submittedForm: any): Observable<any> {
    // The header with the CSRF token is essential
    let headers = new HttpHeaders(
      {
        'X-Csrftoken': this.csrfManagerService.getToken(),
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.getJWTToken()
      }
    );
    // Not setting the cookie does not seem to make a difference.
    // this.cookieService.set('csrftoken', this.csrfToken);
    return this.http.post(this.apiBaseURL + 'new-company/',
              submittedForm.value,
              {headers: headers});
  }


  updateCompany(companyId:any, companyForm:any): Observable<any> {
    // The header with the CSRF token is essential
    let headers = new HttpHeaders(
      {
        'X-Csrftoken': this.csrfManagerService.getToken(),
        'Content-Type': 'application/json'
      }
    );
    // Not setting the cookie does not seem to make a difference.
    // this.cookieService.set('csrftoken', this.csrfToken);
    return this.http.patch(this.apiBaseURL + 'new-company/',
        {
          companyId: companyId,
          companyForm: companyForm.value
        },
        {
          headers: headers
        });
  }


  deleteCompany(companyId: any):Observable<any> {
    // The header with the CSRF token is essential
    let csrfHeader = new HttpHeaders(
      {
        'X-Csrftoken': this.csrfManagerService.getToken()
      }
    );
    // Not setting the cookie does not seem to make a difference.
    // this.cookieService.set('csrftoken', this.csrfToken);
    return this.http.delete(this.apiBaseURL + 'new-company/' +
                      companyId + '/',
                      {
                        headers: csrfHeader
                      });
  }

}
