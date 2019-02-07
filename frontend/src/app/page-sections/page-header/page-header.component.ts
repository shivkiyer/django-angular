import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../services/user.service';
import { UserAuthService } from './../../services/user-auth.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  userLoggedIn: boolean = false;
  smallWindow: boolean = false;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {
    this.onResize();
  }

  ngOnInit() {
    if (this.userAuthService.getJWTToken()) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
    if (window.innerWidth < 960) {
      this.smallWindow = true;
    } else {
      this.smallWindow = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.innerWidth < 960) {
      this.smallWindow = true;
    } else {
      this.smallWindow = false;
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
        this.userService.clearToken();
        this.router.navigate(['/']);
      },
      errors => console.log(errors)
    );
  }

}
