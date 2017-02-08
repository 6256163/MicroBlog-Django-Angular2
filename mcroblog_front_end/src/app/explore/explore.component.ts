/**
 * Created by tianzhang on 2016/12/22.
 */

import {Component, AfterViewInit, ViewChild, ElementRef, ViewContainerRef} from "@angular/core";
import * as $ from 'jquery';
import {PopinfoComponent} from "../popinfo/popinfo.component";
import {PopinfoService} from "../popinfo/popinfo.service";

@Component({
  selector: 'explore',
  templateUrl: './explore.component.html',

})
export class ExploreComponent implements AfterViewInit {


  constructor(private popinfoService: PopinfoService,) {
  }

  @ViewChild('popinfo', {read: ViewContainerRef})
  private popinfo: any; //dynamic target


  showPopinfo(eventTarget,user_id) {
    this.popinfoService.loadCom(this.popinfo, PopinfoComponent,eventTarget,user_id)

  }




  waterfall():void{
    let $explore = $('#explore');
    let $main = $('#main');
    let $boxes = $('.box');
    let w = $($boxes[0]).outerWidth();
    let cols =  Math.floor(($(window).width()-$('#recommend').outerWidth())/w);
    $main.width(w*cols+10);
    $main.height(($(window).height()));
    $explore.width($main.outerWidth()+$('#recommend').outerWidth());
    let h = $boxes.eq(0).outerHeight();

    var lArr = [];
    var tArr = [];
    $main.children().each(function (index, value) {
      if (index < cols) {
        if(index==0){
          lArr[index] = $("#main").offset().left;
        }
        else{
          lArr[index] = lArr[index-1]+300;
        }
        tArr[index] = $('#recommend').offset().top;

      }
      else{
        lArr[cols] = $('#recommend').offset().left;
        tArr[cols] = $('#recommend').offset().top+$('#recommend').outerHeight();
      }
    })

    $main.children().each(function(index,value){
      var minT = Math.min.apply(null,tArr);
      var minIndex = $.inArray(minT,tArr);
      $(value).css({
        'position':'absolute',
        'top':tArr[minIndex],
        'left':lArr[minIndex],
      })
      tArr[minIndex] += $(value).outerHeight();
    })
  }
  @ViewChild('main') main: ElementRef;

  ngAfterViewInit() {
    /*
    let main_w = $('#main').outerWidth();
    let $boxes = $('#main').find('.box');
    let w = $($boxes[0]).outerWidth();
    let cols =  Math.floor(($('#main').outerWidth()-$('#recommend').outerWidth()) / w);
    $('#main').width(w*cols+10);
    $('#explore').width($('#main').outerWidth()+$('#recommend').outerWidth())
    */
     this.waterfall()

  }

}
