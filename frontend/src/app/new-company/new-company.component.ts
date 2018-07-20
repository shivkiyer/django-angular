import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from './../../environments/environment';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {

  apiBaseURL: string = environment.configSettings.apiURL;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get(this.apiBaseURL + 'new-company/').subscribe(
      (response) => {
        console.log(response);
      },
      (errors) => {
        console.log(errors);
      }
    )
  }

}
