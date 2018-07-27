import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from './../../environments/environment';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {

  apiBaseURL: string = environment.configSettings.apiURL;
  response: string;
  newCompanyForm: FormGroup = new FormGroup({
    'name': new FormControl(),
    'headquarters': new FormControl(),
    'address': new FormControl(),
    'company_website': new FormControl(),
    'established_year': new FormControl(null, [Validators.required,
                                                Validators.min(1900),
                                                Validators.max(2018)])
  });
  displayForm: boolean = false;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get(this.apiBaseURL + 'new-company',
        {
          withCredentials: true
        }
      ).subscribe(
        (response) => {
          console.log(response);
          this.response = response.json().message;
        },
        (errors) => {
          console.log(errors);
        }
      )
  }

  emptyForm() {
    this.displayForm = true;
  }

  addCompany() {
    console.log(this.newCompanyForm.value);
  }

}
