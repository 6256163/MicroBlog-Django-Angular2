import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {MdIconRegistry} from "@angular/material";
import {AuthenticationService} from "./service/http/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "./service/http/user.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  encapsulation: ViewEncapsulation.None,
  viewProviders: [MdIconRegistry],
})
export class AppComponent implements OnInit {
  title = 'app works!';
  error: any;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private userService: UserService,) {
  }

  ngOnInit() {
    this.authenticationService.isLogin()
      .subscribe(
        data => {
          //this.router.navigate(['home']);
        },
        error => {
          this.router.navigate(['login']);
        });
  }

  getHeight() {
    let body = document.body;
    let html = document.documentElement;
    return Math.max( body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight ) +'px';
  }
}
