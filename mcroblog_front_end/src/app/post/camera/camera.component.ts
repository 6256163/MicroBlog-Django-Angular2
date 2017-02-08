/**
 * Created by tianzhang on 2017/1/15.
 */
import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter} from "@angular/core";
@Component({
  selector: 'camera',
  templateUrl: './camera.component.html'
})
export class CameraComponent implements AfterViewInit {

  @Output()
  output: EventEmitter<any> = new EventEmitter<any>();

  closeCamera() {
    let _video:any = document.getElementById("camera");
    <HTMLVideoElement>_video;
    this.output.emit(false)
  }

  ngAfterViewInit() {

    let _video:any = document.getElementById("camera");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
          _video.src = window.URL.createObjectURL(stream);
          _video.play();
        })
    }
  }


}
