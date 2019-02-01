import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../services/user.service';
import { UserAuthService } from './../../services/user-auth.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent implements OnInit {

  userLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userAuthService.getJWTToken()) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

  userLogin() {
    this.router.navigate(['/']);
  }

  userRegister() {
    this.router.navigate(['/']);
  }

  userLogout() {
    this.userService.logoutUser().subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/']);
      },
      errors => console.log(errors)
    );
  }

}
