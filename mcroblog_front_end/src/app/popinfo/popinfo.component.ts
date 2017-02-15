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
    if (this.popinfoService.ref) {
      //this.top is set in popinfo.service.createCom()
      this.bottom = $('#popinfo_main').offset().top + $('#popinfo_main').outerHeight();
      this.left = $('#popinfo_main').offset().left;
      this.right = this.left + $('#popinfo_main').outerWidth();
    }
    if (event.pageY < this.top ||
      event.pageY > this.bottom ||
      event.pageX < this.left ||
      event.pageX > this.right) {
      this.popinfoService.destoryCom()
    }

  }

  getBlogContent(blog){
    for(let b of blog.content){
      if($(b.changingThisBreaksApplicationSecurity)[0].localName == 'img'){
        return $(b.changingThisBreaksApplicationSecurity).addClass('insert_img')[0].outerHTML
      }
      else if ($(b.changingThisBreaksApplicationSecurity)[0].localName == 'embed'){
        return $('<div></div>').addClass('play_button')[0].outerHTML
      }
    }
    return blog.title
  }

}
