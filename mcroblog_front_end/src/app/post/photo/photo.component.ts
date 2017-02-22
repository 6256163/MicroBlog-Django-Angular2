import {Component, trigger, transition, animate, style, ViewChild, Output, EventEmitter, state} from "@angular/core";
import {FileUploadService} from "../../service/http/file.upload.service";
import {RichTextComponent} from "../richtext/richtext.component";
import {Blog} from "../../model/blog";
import {BlogService} from "../../service/http/blog.service";
import {AuthenticationService} from "../../service/http/authentication.service";
import {CameraComponent} from "../camera/camera.component";
/**
 * Created by tianzhang on 2017/1/9.
 */
@Component({
  selector: 'photo',
  templateUrl: './photo.component.html',
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({transform: 'translateY(-10px)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateY(-20px)'}))
      ])
    ]),
  ],
})
export class PhotoComponent {


  images: any[] = [];
  display_upload = true;
  display_camera = false;

  shwoCamera() {
    this.display_camera = !this.display_camera;
  }

  constructor(private fileService: FileUploadService,
              private blogService: BlogService,
              private authentication: AuthenticationService,) {
  }


  errorMessage: any;

  @ViewChild(RichTextComponent)
  private richtext: RichTextComponent;
  @ViewChild(CameraComponent)
  private camera: CameraComponent;

  onSubmit() {
    let content = this.richtext.getContent($('#content').contents())
    let blog = new Blog();
    blog.title = '';
    blog.tags = $('#tag').text();
    blog.content = content;
    this.blogService.postBlog(blog)
      .subscribe(
        body => {
          location.reload();
        },
        error => this.errorMessage = <any>error);
  }

  @Output()
  closePhoto: EventEmitter<any> = new EventEmitter<any>();

  hidePost() {
    this.closePhoto.emit(false) //set postMess to false
  }
}
