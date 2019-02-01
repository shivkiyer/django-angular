import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { UserService } from './../services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './register-box.component.html'
})
export class RegisterBoxComponent {

  constructor(
    private userService: UserService
  ) {}

  userRegistrationForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  registerUser() {
    this.userService.registerUser(this.userRegistrationForm).subscribe(
      response => console.log(response),
      errors => console.log(errors)
    );
  }

}