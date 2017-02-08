import {Component, trigger, transition, animate, style} from "@angular/core";
/**
 * Created by tianzhang on 2017/1/9.
 */
@Component({
  selector: 'video',
  templateUrl: './video.component.html',
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
export class VideoComponent {}
