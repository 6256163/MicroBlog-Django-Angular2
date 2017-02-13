import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../service/http/authentication.service";
/**
 * Created by tianzhang on 2017/1/1.
 */
@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit{
  model = {
    username: '',
    password: '',
  }

  error:any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    ) { }

  ngOnInit() {
    this.authenticationService.isLogin()
      .subscribe(
        data => {
          this.router.navigate(['home']);
        },
        error => {
          //this.error=error;
        });
  }


  onSubmit(){
    this.login();
  }

  login() {
    this.authenticationService.login(this.model)
      .subscribe(
        data => {
          this.router.navigate(['home']);
        },
        error => {
          if(error){
            this.error=error;

          }

        });
  }


}
