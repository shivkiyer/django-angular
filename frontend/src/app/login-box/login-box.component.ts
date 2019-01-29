import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './login-box.component.html',
})
export class LoginBoxComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  userLoginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  loginUser() {
    console.log(this.userLoginForm.value);
    this.userService.loginUser(this.userLoginForm).subscribe(
      response => {
        console.log(response);
        console.log(response.headers.keys());
        this.router.navigate(['/new-company/']);
      },
      errors => console.log(errors)
    );
  }

}
