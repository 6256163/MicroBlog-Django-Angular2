/**
 * Created by tianzhang on 2016/12/22.
 */
import {Component, trigger, transition, style, animate, HostListener, OnInit,} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/http/authentication.service";

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({transform: 'translateY(-10px)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateY(-20px)'}))
      ])
    ])
  ]
})
export class NavbarComponent {

  private hideChat: boolean = true;
  private hideActivity: boolean = true;
  private hideAccount: boolean = true;
  private authentication:boolean;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  chatShowHide(event) {
    this.hideActivity = true;
    this.hideAccount = true;
    this.hideChat = !this.hideChat;
  }

  avtivityShowHide(event) {
    this.hideChat = true;
    this.hideAccount = true;
    this.hideActivity = !this.hideActivity;
  }

  accountShowHide(event) {
    this.hideChat = true;
    this.hideActivity = true;
    this.hideAccount = !this.hideAccount;
  }

  mouseOver(event) {
    event.currentTarget.className = 'active';
  }

  mouseOut(event) {
    event.currentTarget.className = '';
  }


  /* dynamic load
   constructor(private resolver: ComponentFactoryResolver) {
   }

   @ViewChild('popinfo', {read: ViewContainerRef})
   private popinfo: any; //dynamic target

   private componentReference: ComponentRef<any>;

   ngAfterViewInit() {
   // Create our chat component now we're initialised
   let componentFactory = this.resolver.resolveComponentFactory(PopinfoComponent);
   this.componentReference = this.popinfo.createComponent(componentFactory);
   }
   */

}
