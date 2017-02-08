/**
 * Created by tianzhang on 2016/12/26.
 */
import {
  Injectable, ComponentFactoryResolver
} from "@angular/core";
import 'rxjs/add/operator/toPromise'
import {UserService} from "../service/http/user.service";
@Injectable()
export class PopinfoService {
  private ref: any;

  constructor(private resolver: ComponentFactoryResolver,
              private userService: UserService,) {
  }


  loadCom(viewChild, dynamic_com,$targer, user_id) {
    this.userService.getById(user_id)
      .then(user => {
        this.userService.user_extend = user;
        this.createCom(viewChild, dynamic_com,$targer)
      })
  }

  createCom(viewChild,dynamic_com, $targer) {

    // Create our chat component now we're initialised
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
      componentReference.instance.bottom = $(componentReference._nativeElement.firstChild).offset().top +
        $(componentReference._nativeElement.firstChild).outerHeight();
      componentReference.instance.left = $(componentReference._nativeElement.firstChild).offset().left;
      componentReference.instance.right = $(componentReference._nativeElement.firstChild).offset().left +
        $(componentReference._nativeElement.firstChild).outerWidth();

    }


  }


  destoryCom(): any {
    if (this.ref) {
      this.ref.destroy();
      this.ref = '';
    }
  }
}
