/**
 * Created by tianzhang on 2016/12/25.
 */

import {Component} from '@angular/core';
import * as $ from 'jquery';
import {AuthenticationService} from "../service/http/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'account',
  templateUrl: './account.component.html',

})
export class AccountComponent {

  constructor(private authenticationService: AuthenticationService,
  private router:Router){}

  logout(){
    this.authenticationService.logout()
      .subscribe(
        data => {
          this.router.navigate(['']);
        });
  }
}
