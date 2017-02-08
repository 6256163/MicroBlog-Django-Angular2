/**
 * Created by tianzhang on 2017/1/18.
 */
import {Component, HostListener, Input, OnInit} from "@angular/core";
import {PopinfoService} from "./popinfo.service";
import {UserService} from "../service/http/user.service";
import {User} from "../model/user";
import {AuthenticationService} from "../service/http/authentication.service";
@Component({
  selector: 'selfinfo',
  templateUrl: './selfinfo.component.html'

})
export class SelfinfoComponent  {

  public top;
  public bottom;
  public right;
  public left;
  user= new User()
  user_id: any;

  constructor(private popinfoService: PopinfoService,
              private userService: UserService,
              private authenticationService: AuthenticationService ) {
  }


  @HostListener('document:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (event.pageY < this.top ||
      event.pageY > this.bottom ||
      event.pageX < this.left ||
      event.pageX > this.right) {
      this.popinfoService.destoryCom()
    }

  }

}
