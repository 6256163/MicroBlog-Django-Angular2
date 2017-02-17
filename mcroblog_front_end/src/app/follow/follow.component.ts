/**
 * Created by tianzhang on 2016/12/26.
 */
import {Component, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {FollowService} from "../service/http/follow.service";
import {Follow} from "../model/user";
import {AuthenticationService} from "../service/http/authentication.service";
import {PopinfoService} from "../popinfo/popinfo.service";
import {PopinfoComponent} from "../popinfo/popinfo.component";
@Component({
  selector: 'follow',
  templateUrl: './follow.component.html'
})
export class FollowComponent implements OnInit {

  constructor(private followService: FollowService,
              private authenticationService: AuthenticationService,
              private popinfoService: PopinfoService,) {
  }

  ngOnInit() {
    this.getfollow()
  }


  follow_list: Follow[];
  next: string;
  errorMessage: any;

  getfollow() {
    this.followService.getFollow()
      .subscribe(
        body => {
          this.follow_list = body.results;
          this.next = body.next
        },
        error => this.errorMessage = <any>error);

  }

  follow(event, follow_obj) {
    let target = event.currentTarget;
    if (target.className.indexOf('btn-default') > -1) {
      this.followService.destroyFollow(follow_obj.id)
        .subscribe(
          body => {
            this.authenticationService.user_extend.follow_count -= 1;
            target.className = target.className.replace('btn-default', 'btn-info');
            target.innerHTML = 'Follow';
          },
          error => this.errorMessage = <any>error
        )

    }
    else {

      this.followService.createFollow(follow_obj)
        .subscribe(
          body => {
            this.authenticationService.user_extend.follow_count += 1;
            target.className = target.className.replace('btn-info', 'btn-default');
            target.innerHTML = 'Unfollow';
          },
          error => this.errorMessage = <any>error);
    }
  }


  @ViewChild('popinfo', {read: ViewContainerRef})
  private popinfo: any; //dynamic target


  showPopinfo(eventTarget, user_id) {
    this.popinfoService.loadCom(this.popinfo, PopinfoComponent, $(eventTarget.currentTarget), user_id)

  }
}
