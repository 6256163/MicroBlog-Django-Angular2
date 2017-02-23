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
  photo_uri: string;

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
    let static_str = this.authentication.getStatic();
    let content = this.richtext.getContent($('#content').contents())
    let blog = new Blog();
    blog.title = '';
    blog.tags = $('#tag').text();
    blog.content = content;
    if (this.photo_uri) {
      blog.content.unshift("<img src='" +this.photo_uri+ "'/>")
    }
    $.each($('#photo-list').find('img'), function (index, value) {
      blog.content.unshift("<img src='" + value.src.replace(static_str, '') + "'/>")
    })

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

  uploadImg(event, ctrl_id) {
    event.preventDefault();
    $(ctrl_id).click();
  }

  insert_photo(photo_uri) {
    let insert_photo_this = this;
    $('#photo-list')
      .append(
        $('<div></div>')
          .css({
            'padding': '10px 0 0 0',
            'position': 'relative',
          })
          .prepend(
            $('<figure></figure>')
              .addClass('insert_fig')
              .append(
                $('<img/>')
                  .attr('src', this.authentication.getStatic() + photo_uri)
                  .addClass('insert_img')
              )
          )
          .append(
            $('<div></div>')
              .addClass('insert_cross')
              .click(function () {
                $(this).parent().remove()
                if (!$('#photo-list').find('img').length) {
                  insert_photo_this.display_upload = true;
                }
              })
          )
      )
  }

  processUploadPhoto(event) {
    this.display_upload = false;
    let this_ = this;
    this.fileService.uploadFile(event.srcElement.files)
      .subscribe(
        body => {
          this.insert_photo(body);
        },

        error => this.errorMessage = <any>error);
    event.srcElement.value = '';
  }
}
