import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAuthService } from './../../services/user-auth.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent implements OnInit {

  userLoggedIn: boolean = false;

  constructor(
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

}
