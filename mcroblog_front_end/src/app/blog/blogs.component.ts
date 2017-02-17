/**
 * Created by tianzhang on 2016/12/22.
 */
import {
  Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, HostListener, Input,
  Injectable
} from "@angular/core";
import {Blog} from "../model/blog";
import {BlogService} from "../service/http/blog.service";
import {PopinfoService} from "../popinfo/popinfo.service";
import {PopinfoComponent} from "../popinfo/popinfo.component";
import {DomSanitizer} from "@angular/platform-browser";
import {DecodeService} from "../service/decode/decode.service";
import {AuthenticationService} from "../service/http/authentication.service";
import {UserService} from "../service/http/user.service";
import {LikeService} from "../service/http/like.service";
@Component({
  selector: 'blogs-list',
  templateUrl: './blogs.component.html',
  providers: [BlogService],
})
@Injectable()
export class BlogComponent implements OnInit {
  blogs = [];
  errorMessage: string;
  nextPage: number;
  @Input()
  with_head_image: boolean;

  constructor(private blogService: BlogService,
              private popinfoService: PopinfoService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private likeService: LikeService,) {

  }


  ngOnInit(): void {
    this.getBlogs();

  }

  getBlogs() {
    this.blogService.getBlogs()
      .subscribe(
        body => {
          this.blogs = this.blogService.decodeBlogs(body.results)
          this.nextPage = body.next
        },
        error => this.errorMessage = <any>error);

  }


  @ViewChild('popinfo', {read: ViewContainerRef})
  private popinfo: any; //dynamic target


  showPopinfo(eventTarget, user_id) {
    this.popinfoService.loadCom(this.popinfo, PopinfoComponent, $(eventTarget.currentTarget), user_id)

  }

  islike(blog_id) {
    if (this.authenticationService.likes.indexOf(blog_id) > -1) {
      return true
    }
    else {
      return false
    }
  }

  like(blog, event) {
    let target = event.currentTarget
    if (event.currentTarget.innerHTML == 'favorite') {
      this.likeService.distroy(blog.id)
        .subscribe(
          body => {
            this.authenticationService.likes.splice(this.authenticationService.likes.indexOf(blog.id), 1)
            this.authenticationService.user_extend.like_count -= 1;
            blog.note -= 1;
            target.innerHTML = 'favorite_border';
            target.style.color = '';
            target.title = 'like'
          },
          error => this.errorMessage = <any>error
        )

    }
    else {
      this.likeService.createlike(blog.id)
        .subscribe(
          body => {
            this.authenticationService.likes.push[blog.id]
            this.authenticationService.user_extend.like_count += 1;
            blog.note += 1;
            target.innerHTML = 'favorite';
            target.style.color = 'red';
            target.title = 'dislike'
          },
          error => this.errorMessage = <any>error
        )

    }

  }


  private scoreMoveTop: number = 0;
  private scoreMoveLeft: number = 0;
  private holdHeadImg_left = 0;
  private holdHeadImg_scrollLeft = 0;

  @HostListener('window:scroll', ['$event'])
  holdHeadImg(event) {
    let _this = this;
    if ($(window).scrollLeft() != _this.holdHeadImg_scrollLeft) {
      _this.holdHeadImg_scrollLeft = $(window).scrollLeft()
    }

    // 页面开始滑动 触发判断
    if (Math.abs(this.scoreMoveTop - $(window).scrollTop()) ||
      Math.abs(this.scoreMoveLeft - $(window).scrollLeft())) {
      this.scoreMoveTop = $(window).scrollTop();
      this.scoreMoveLeft = $(window).scrollLeft();
      let $targets = $(event.currentTarget.document).find('.headimg');
      $targets.each(function (index, value) {

        // 寻找当前client窗口中最顶部的img元素
        if ($(value).offset().top >= $(value).parent().offset().top && $(value).offset().top - $(window).scrollTop() <= 81) {
          if (!_this.holdHeadImg_left) {
            _this.holdHeadImg_left = $(value).offset().left;
          }
          let right = $('#choose_post').eq(0).offset().left
          // img元素底部未超过对应blog内容的底部
          $(value).css({
            'position': 'fixed',
            'top': '81px',
            'left': _this.holdHeadImg_left - _this.holdHeadImg_scrollLeft + 'px'
          })

          //img元素其位置即将超过对应blog内容的底部
          if ($(value).offset().top + $(value).outerHeight() >= $(value).parent().offset().top + $(value).parent().outerHeight()) {

            $(value).css({
              'position': 'absolute',
              'top': $(value).parent().offset().top + $(value).parent().outerHeight() - $(value).outerHeight() + 'px',
              'left': _this.holdHeadImg_left + 'px'
            })

          }
        }


        else {
          $(value).css({
            'position': 'static',
            'top': '',
            'left': ''
          })
        }


      })
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let $targets = $(event.currentTarget.document).find('.headimg');
    $targets.each(function (index, value) {
      $(value).css({
        'position': 'static',
        'top': '',
        'left': ''
      });
    })
    this.holdHeadImg_left = 0
    this.holdHeadImg_scrollLeft = 0;
  }
}
