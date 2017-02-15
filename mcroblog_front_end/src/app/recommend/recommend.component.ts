/**
 * Created by tianzhang on 2016/12/23.
 */
import {
  Component, ViewContainerRef, ViewChild, ComponentRef, HostListener, OnInit, OnChanges,
  trigger, transition, style, animate, keyframes
} from "@angular/core";
import {PopinfoService} from "../popinfo/popinfo.service";
import {PopinfoComponent} from "../popinfo/popinfo.component";
import {UserService} from "../service/http/user.service";
import {UserExtend, User, UserExtendForList} from "../model/user";
import {AuthenticationService} from "../service/http/authentication.service";
import {FollowService} from "../service/http/follow.service";
import {forEach} from "@angular/router/src/utils/collection";
@Component({
  selector: 'recommend',
  templateUrl: './recommend.component.html',
  animations: [
    trigger('showhide', [
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class RecommendComponent implements OnChanges {

  users: UserExtendForList[];
  next: any;

  constructor(private popinfoService: PopinfoService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private followService: FollowService,) {
    this.getUsers()
  }

  errorMessage: any;

  private follow(follower) {
    this.followService.createFollow(follower)
      .subscribe(
        body => {
          for (let u of this.users) {
            if (u.id == follower.id) {
              this.users.splice(this.users.indexOf(u), 1)
            }
          }
        },
        error => this.errorMessage = <any>error);

  }

  ngOnChanges() {
    this.getUsers()
  }

  @ViewChild('popinfo', {read: ViewContainerRef})
  private popinfo: any; //dynamic target


  showPopinfo(eventTarget, user_id) {
    this.popinfoService.loadCom(this.popinfo, PopinfoComponent, $(eventTarget.currentTarget), user_id)

  }


  getUsers() {
    this.userService.getAll()
      .then(results => {
        this.users = results.results;
        this.next = results.next
      })
  }

  getMore() {
    this.users = []
    if (this.next == null) {
      this.next = this.authenticationService.getApi() + this.userService.getUserExtendUrl()
    }
    else {
      if (this.next.match(/http:\/\//i) != null) {
        this.next = this.next.replace(/http:\/\//i, 'https://')
      }
    }


    this.userService.getByNextPage(this.next)
      .then(results => {
        this.users = results.results
        this.next = results.next

      })
  }


}
