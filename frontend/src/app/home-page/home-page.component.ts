import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { UserService } from './../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  constructor(
    private userService: UserService
  ) {}

  userRegistrationForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  userLoginForm = new FormGroup({
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
