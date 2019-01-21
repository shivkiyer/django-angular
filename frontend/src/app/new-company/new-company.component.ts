import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from './../../environments/environment';
import { CompanyService } from './../services/company.service';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {
  earliestYear: number = 1900;
  latestYear: number = 2018;

  companyList = [];
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


  constructor(
    private companyService: CompanyService
  ) {}

  ngOnInit() {}


  emptyForm() {
    this.displayForm = true;
    this.showCompanies = false;
    this.blankForm = true;
  }


  displayCompanies() {
    this.companyService.fetchCompanyList().subscribe(
      (response) => {
        this.companyList = response['companies'];
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
    this.companyService.addCompany(this.newCompanyForm)
      .subscribe(
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
    this.companyService.updateCompany(
          this.companyList[companyIndex].id,
          this.newCompanyForm
        ).subscribe(
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
        );
  }


  deleteCompany(companyIndex: number) {
    this.companyService.deleteCompany(
        this.companyList[companyIndex].id.toString()
      ).subscribe(
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
