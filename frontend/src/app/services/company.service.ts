import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';

import { CSRFManagerService } from './csrf-manager.service';
// import { CookieManager } from './cookie-manager.service';

@Injectable()
export class CompanyService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private csrfManagerService: CSRFManagerService
  ) {}

  apiBaseURL = environment.configSettings.apiURL;
  // csrfToken: string = '';

  fetchCompanyList(): Observable<any> {
    return this.http.get(this.apiBaseURL + 'new-company/',
        {
          withCredentials: true
        }
      ).pipe(
        map(
          (response) => {
            // this.csrfToken = this.cookieService.get('csrftoken');
            // if (!CookieManager.csrfToken) {
            if (!this.csrfManagerService.getToken()) {
              // CookieManager.csrfToken = this.cookieService.get('csrftoken');
              this.csrfManagerService.setToken(this.cookieService.get('csrftoken'));
              // this.csrfToken = CookieManager.csrfToken;
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
        'Content-Type': 'application/json'
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
