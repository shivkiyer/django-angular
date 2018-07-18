import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  djangoForm: FormGroup;
  formReceived: boolean = false;
  receivedForm: any;

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get('/api/new-company').subscribe(
      (response) => {
        console.log(response);
        // this.djangoForm = new FormGroup({});
        // this.receivedForm = Object.keys(response.json()['form']);
        // // this.receivedForm.splice(this.receivedForm.indexOf('id'), 1);
        // this.receivedForm.forEach((key_item) => {
        //   // if (key_item!== 'id') {
        //     this.djangoForm.addControl(
        //       key_item,
        //       new FormControl()
        //     );
        //   // }
        // });
        // this.formReceived = true;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  formSubmit() {

  }

}
