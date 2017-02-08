import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/http/authentication.service";
/**
 * Created by tianzhang on 2016/12/30.
 */
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  authentication = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,) {
  }

  ngOnInit() {
    this.authenticationService.isLogin()
      .subscribe(
        data => {
          this.authentication = true
        },
        error => {
          this.router.navigate(['login']);
        });
  }
}
