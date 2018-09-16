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
  companyList: any;
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
  expandCompany: number = -1;
  blankForm: boolean = true;
  updateCompanyIndex: number = -1;

  constructor(private http: Http) { }

  fetchCompanyList() {
    return this.http.get(this.apiBaseURL + 'new-company',
        {
          withCredentials: true
        }
      );
  }

  ngOnInit() {}

  emptyForm() {
    this.displayForm = true;
    this.showCompanies = false;
    this.blankForm = true;
  }

  displayCompanies() {
    this.fetchCompanyList().subscribe(
      (response) => {
        this.companyList = response.json().companies;
        console.log(this.companyList);
        if (this.companyList.length>0) {
          this.areCompanies = true;
          this.showCompanies = true;
        }
        this.displayForm = false;
      },
      (errors) => {
        console.log(errors);
      }
    );
  }

  hideCompanies() {
    this.showCompanies = false;
  }

  companyAdded() {
    this.newCompanyForm.reset();
    this.displayForm = false;
    if (!this.areCompanies) {
      this.areCompanies = true;
    }
  }

  addCompany() {
    console.log(this.newCompanyForm.value);
    this.http.post(this.apiBaseURL + 'new-company',
              JSON.stringify(this.newCompanyForm.value)).subscribe(
      response => {
        this.companyList.push(this.newCompanyForm.value);
        this.companyAdded();
      },
      errors => {
        console.log(errors);
      }
    );
  }

  chooseCompany(companyIndex: number) {
    if (companyIndex===this.expandCompany) {
      this.expandCompany = -1;
    } else {
      this.expandCompany = companyIndex;
    }
  }

  modifyCompany(companyIndex: number) {
    this.newCompanyForm.setValue({
      'name': this.companyList[companyIndex].name,
      'headquarters': this.companyList[companyIndex].headquarters,
      'address': this.companyList[companyIndex].address,
      'company_website': this.companyList[companyIndex].company_website,
      'established_year': this.companyList[companyIndex].established_year
    })
    this.displayForm = true;
    this.showCompanies = false;
    this.blankForm = false;
    this.updateCompanyIndex = companyIndex;
  }

  updateCompany(companyIndex: number) {
    this.http.patch(this.apiBaseURL + 'new-company',
        {
          companyId: this.companyList[companyIndex].id,
          companyForm: JSON.stringify(this.newCompanyForm.value)
        })
        .subscribe(
          response => {
            Object.keys(this.companyList[companyIndex]).forEach(
              item => {
                this.companyList[companyIndex][item] = this.newCompanyForm.value[item];
              }
            );
            this.companyAdded();
          },
          errors => {
            console.log(errors);
          }
        )
  }

  deleteCompany(companyIndex: number) {
    this.http.delete(this.apiBaseURL + 'new-company/' +
                      this.companyList[companyIndex].id.toString() +
                      '/').subscribe(
      response => {
        this.companyList.splice(companyIndex, 1);
        this.expandCompany = -1;
      },
      errors => {
        console.log(errors);
      }
    );
  }


}
