/**
 * Created by tianzhang on 2017/1/15.
 */
import {
  Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, trigger,
  transition, style, animate
} from "@angular/core";
import {RichTextComponent} from "../richtext/richtext.component";
import {FileUploadService} from "../../service/http/file.upload.service";
@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
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
export class CameraComponent implements AfterViewInit {

  @Output()
  output: EventEmitter<any> = new EventEmitter<any>();
  localstream: any;
  photo_data: any;

  constructor(private fileService: FileUploadService) {
  }

  closeCamera() {
    let _video: any = document.getElementById("camera");
    <HTMLVideoElement>_video;
    this.output.emit(false)
    for (let track of this.localstream.getTracks()) {
      track.stop()
    }

  }

  snapPhoto() {
    var snap = document.getElementById('snap');
    var refresh = document.getElementById('refresh');
    var publish = document.getElementById('publish');
    var video = <HTMLVideoElement>document.getElementById('camera');
    let width = $(video).outerWidth();
    let height = $(video).outerHeight();
    var canvas = <HTMLCanvasElement>document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    this.photo_data = context.getImageData(0, 0, width, height);
    $(video).hide();
    $(canvas).show();
    $(snap).hide();
    $(refresh).show();
    $(publish).show()
    return false;  //to

  }

  refreshPhoto() {
    var snap = document.getElementById('snap');
    var refresh = document.getElementById('refresh');
    var publish = document.getElementById('publish');
    var video = <HTMLVideoElement>document.getElementById('camera');
    var canvas = <HTMLCanvasElement>document.getElementById('canvas');
    $(video).show();
    $(canvas).hide();
    $(snap).show();
    $(refresh).hide();
    $(publish).hide()
  }


  @ViewChild(RichTextComponent)
  private richtext: RichTextComponent;

  uploadPhoto(event) {
    let file_list = [];
    let uploadPhoto_this = this;
    var canvas = <HTMLCanvasElement>document.getElementById('canvas');
    canvas.toBlob(function (blob) {
      file_list.push(blob);
      uploadPhoto_this.richtext.processUploadImg(event, file_list);
      /*
       uploadPhoto_this.fileService.uploadFile(file_list)
       .subscribe(
       body=>{
       this.richtext
       },
       error=>{}
       )
       */

    })
    //this.richtext.uploadImg(event, file_list)

  }

  ngAfterViewInit() {

    let _video: any = document.getElementById("camera");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
          _video.src = window.URL.createObjectURL(stream);
          _video.play();
          this.localstream = stream;
        })
    }
  }


}
