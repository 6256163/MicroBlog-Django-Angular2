/**
 * Created by tianzhang on 2016/12/25.
 */

import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',

})
export class ChatComponent {
 private chatDefaut:boolean = true;
  private chatTo:boolean = false;


  showChatTo(){
    this.chatDefaut=false;
    this.chatTo=true;
  }

  hideChatTo(){
    this.chatDefaut=true;
    this.chatTo=false;
  }
}
