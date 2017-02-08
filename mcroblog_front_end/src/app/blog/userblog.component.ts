/**
 * Created by tianzhang on 2017/1/18.
 */
import {Component, Input, OnInit} from "@angular/core";
import {UserService} from "../service/http/user.service";
import {UserExtend} from "../model/user";
import {AuthenticationService} from "../service/http/authentication.service";
@Component({
  selector:'user-blog',
  templateUrl:'./userblog.component.html'
})
export class UserBlogComponent {


  constructor(private userService:UserService,
              private authenticationService: AuthenticationService,){}

}
