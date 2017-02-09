/**
 * Created by tianzhang on 2016/12/22.
 */
import {Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, HostListener, Input} from "@angular/core";
import {Blog} from "../model/blog";
import {BlogService} from "../service/http/blog.service";
import {PopinfoService} from "../popinfo/popinfo.service";
import {PopinfoComponent} from "../popinfo/popinfo.component";
import {DomSanitizer} from "@angular/platform-browser";
import {DecodeService} from "../service/decode/decode.service";
import {AuthenticationService} from "../service/http/authentication.service";
import {UserService} from "../service/http/user.service";
@Component({
  selector: 'blogs-list',
  templateUrl: './blogs.component.html',
  providers: [BlogService],
})
export class BlogComponent implements OnInit {
  blogs: Blog[];
  errorMessage: string;
  nextPage: number;
  @Input()
  with_head_image: boolean;

  constructor(private blogService: BlogService,
              private sanitizer: DomSanitizer,
              private popinfoService: PopinfoService,
              private decode: DecodeService,
              private authenticationService: AuthenticationService,
              private userService: UserService,) {

  }


  ngOnInit(): void {
    this.getBlogs();

  }

  getBlogs() {
    this.blogService.getBlogs()
      .subscribe(
        body => {
          this.blogs = []
          body.results.forEach((item, index) => {
            this.blogs.push(item)

            //this.blogs[index].content =this.sanitizer.bypassSecurityTrustHtml(body.results[index].content.split('@'));
            let saveHTML: any[] = [];
            for (let content of body.results[index].content.split('@')) {
              let $content_dom = $(this.decode.b64DecodeUnicode(content));
              if ($content_dom[0].nodeName == 'P') {

              }
              else if ($content_dom[0].nodeName == 'IMG') {
                $content_dom.attr('src', this.authenticationService.getStatic() + $content_dom.attr('src'))
              }
              else if ($content_dom[0].nodeName == 'EMBED') {
                $content_dom.show();
              }
              saveHTML.push(this.sanitizer.bypassSecurityTrustHtml($content_dom[0].outerHTML));
            }
            this.blogs[index].content = saveHTML;
            this.blogs[index].title = this.decode.b64DecodeUnicode(this.blogs[index].title)
            this.blogs[index].tags = this.decode.b64DecodeUnicode(this.blogs[index].tags)

          });
          this.nextPage = body.next
        },
        error => this.errorMessage = <any>error);

  }


  @ViewChild('popinfo', {read: ViewContainerRef})
  private popinfo: any; //dynamic target


  showPopinfo(eventTarget ,user_id) {
    this.popinfoService.loadCom(this.popinfo, PopinfoComponent, $(eventTarget.currentTarget),user_id)

  }


  private scoreMoveTop: number = 0;
  private scoreMoveLeft: number = 0;
  private holdHeadImg_left = 0
  private holdHeadImg_scrollLeft = 0;
  @HostListener('window:scroll', ['$event'])
  holdHeadImg(event) {
    let _this = this;
    if ($(window).scrollLeft() != _this.holdHeadImg_scrollLeft){
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
          if (!_this.holdHeadImg_left){
            _this.holdHeadImg_left = $(value).offset().left;
          }
          let right = $('.modal-content').eq(0).offset().left
          // img元素底部未超过对应blog内容的底部
          $(value).css({
            'position': 'fixed',
            'top': '81px',
            'left': _this.holdHeadImg_left -_this.holdHeadImg_scrollLeft + 'px'
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

        //client窗口中不可见的img元素 或 非第一个可见img元素
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
}
