/**
 * Created by tianzhang on 2016/12/26.
 */
import {
  Injectable, ComponentFactoryResolver
} from "@angular/core";
import 'rxjs/add/operator/toPromise'
import {UserService} from "../service/http/user.service";
import {BlogComponent} from "../blog/blogs.component";
import {BlogService} from "../service/http/blog.service";
@Injectable()
export class PopinfoService {
  public ref: any;

  constructor(private resolver: ComponentFactoryResolver,
              private userService: UserService,
              private blogService: BlogService,) {
  }


  loadCom(viewChild, dynamic_com, $targer, user_id) {
    this.userService.getById(user_id)
      .then(data => {
        this.userService.user_extend.user = data.user;
        this.userService.user_extend.blogs = this.blogService.decodeBlogs(data.blogs);
        this.createCom(viewChild, dynamic_com, $targer)
      })
  }


  createCom(viewChild, dynamic_com, $targer) {

    // Create our popinfo component now we're initialised
    /*
     viewChild: dynamic load the component under viewChild - eg. @ViewChild('popinfo', {read: ViewContainerRef})
     targetCom: The component need to be dynamic loaded.
     eventTarget: MouseEvent, use it to locate the popup dialog.
     */

    if (!this.ref) {
      let componentFactory = this.resolver.resolveComponentFactory(dynamic_com);
      let componentReference = viewChild.createComponent(componentFactory);
      this.ref = componentReference;
      let left = $targer.offset().left + $targer.outerWidth() / 2 - 150;
      $(componentReference._nativeElement.firstChild).css({
        "top": $targer.offset().top + $targer.outerHeight() + 'px',
        'left': left < 0 ? 0 : left + 'px',
      });
      componentReference.instance.top = $targer.offset().top;

    }


  }


  destoryCom(): any {
    if (this.ref) {
      this.ref.destroy();
      this.ref = '';
    }
  }
}
