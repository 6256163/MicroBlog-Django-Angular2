/**
 * Created by tianzhang on 2016/12/26.
 */
import {Component, HostListener, Input, OnInit} from "@angular/core";
import {PopinfoService} from "./popinfo.service";
import {UserService} from "../service/http/user.service";
import {AuthenticationService} from "../service/http/authentication.service";
@Component({
  selector: 'popinfo',
  templateUrl: './popinfo.component.html'

})
export class PopinfoComponent {

  public top;
  public bottom;
  public right;
  public left;

  constructor(private popinfoService: PopinfoService,
              private userService: UserService,
              private authenticationService: AuthenticationService,) {
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
