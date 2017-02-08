/**
 * Created by tianzhang on 2016/12/23.
 */
import {Component, ViewContainerRef, ViewChild, ComponentRef, HostListener, OnInit, OnChanges} from "@angular/core";
import {PopinfoService} from "../popinfo/popinfo.service";
import {PopinfoComponent} from "../popinfo/popinfo.component";
import {UserService} from "../service/http/user.service";
import {UserExtend} from "../model/user";
import {AuthenticationService} from "../service/http/authentication.service";
import {FollowService} from "../service/http/follow.service";
import {forEach} from "@angular/router/src/utils/collection";
@Component({
  selector: 'recommend',
  templateUrl: './recommend.component.html',
})
export class RecommendComponent implements OnChanges {

  users: UserExtend[];

  constructor(private popinfoService: PopinfoService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private followService: FollowService,) {
    this.userService.getAll()
      .then(results => {
        this.users = results.results
      })
  }

  errorMessage: any;

  follow(follow) {
    this.followService.createFollow(follow)
      .subscribe(
        body => {
          let u_array = this.users;
          u_array.every(function (item, index, array) {
            if (index == follow.id){
              this.users.splice(index,1)
              return false
            }
          })
        },
        error => this.errorMessage = <any>error);

  }

  ngOnChanges() {
    this.userService.getAll()
      .then(results => {
        this.users = results.results
      })
  }

  @ViewChild('popinfo', {read: ViewContainerRef})
  private popinfo: any; //dynamic target


  showPopinfo(eventTarget, user_id) {
    this.popinfoService.loadCom(this.popinfo, PopinfoComponent, $(eventTarget.currentTarget), user_id)

  }


  getUsers() {
    this.userService.getAll()
      .then(results => {
        this.users = results
      })
  }
}
