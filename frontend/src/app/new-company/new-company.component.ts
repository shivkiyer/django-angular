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
  earliestYear: number = 1900;
  latestYear: number = 2018;

  apiBaseURL: string = environment.configSettings.apiURL;
  response: any;
  showCompanies: boolean = false;
  areCompanies: boolean = false;
  name: FormControl = new FormControl(null, Validators.required);
  headquarters: FormControl = new FormControl(null, Validators.required);
  address: FormControl = new FormControl(null, Validators.required);
  company_website: FormControl = new FormControl(null, [
    Validators.required,
    Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
  ]);
  established_year: FormControl = new FormControl(null, [Validators.required,
                                              Validators.min(this.earliestYear),
                                              Validators.max(this.latestYear)]);

  newCompanyForm: FormGroup = new FormGroup({
    'name': this.name,
    'headquarters': this.headquarters,
    'address': this.address,
    'company_website': this.company_website,
    'established_year': this.established_year
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
          this.response = response.json().companies;
          if (this.response.length>0) {
            this.areCompanies = true;
          }
        },
        (errors) => {
          console.log(errors);
        }
      )
  }

  emptyForm() {
    this.displayForm = true;
    this.showCompanies = false;
  }

  displayCompanies() {
    if (this.response.length > 0) {
      this.showCompanies = true;
    } else {
      this.showCompanies = false;
    }
    this.displayForm = false;
  }

  hideCompanies() {
    this.showCompanies = false;
  }

  addCompany() {
    console.log(this.newCompanyForm.value);
    this.http.post(this.apiBaseURL + 'new-company',
              JSON.stringify(this.newCompanyForm.value)).subscribe(
      response => {
        this.response.push(this.newCompanyForm.value);
        this.newCompanyForm.reset();
        this.displayForm = false;
      },
      errors => {
        console.log(errors);
      }
    );
  }

}
