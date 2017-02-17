/**
 * Created by tianzhang on 2016/12/25.
 */

import {Component} from '@angular/core';
import * as $ from 'jquery';
import {AuthenticationService} from "../service/http/authentication.service";
import {Router} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {UserService} from "../service/http/user.service";


@Component({
  selector: 'account',
  templateUrl: './account.component.html',

})
export class AccountComponent {

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private nav: NavbarComponent) {
  }

  logout() {
    this.hideSelf();
    this.authenticationService.logout()
      .subscribe(
        data => {
          //Redirect to default page
          //this.router.navigate(['']);
          this.authenticationService.isLogin()
            .subscribe(
              data => {
                this.authenticationService.authentication = true
              },
              error => {
                this.router.navigate(['login']);
              });
        });
  }

  hideSelf() {
    this.nav.accountShowHide(event)
  }
}
