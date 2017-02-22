import {
  Component, trigger, transition, animate, style, Directive, ViewChild, Output,
  EventEmitter
} from "@angular/core";
import {FileUploadService} from "../../service/http/file.upload.service";
import {Blog} from "../../model/blog";
import {BlogService} from "../../service/http/blog.service";
import {Router} from "@angular/router";
import {RichTextComponent} from "../richtext/richtext.component";
import {AuthenticationService} from "../../service/http/authentication.service";
/**
 * Created by tianzhang on 2017/1/9.
 */
@Component({
  selector: 'text',
  templateUrl: './text.component.html',
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
//@Directive({selector: '[ContenteditableModel]'})
export class TextComponent {
  errorMessage: any;
  target: any;

  constructor(private fileService: FileUploadService,
              private blogService: BlogService,
              private router: Router,
              private authentication: AuthenticationService,) {
  }


  @ViewChild(RichTextComponent)
  private richtext: RichTextComponent;

  onSubmit() {
    let content = this.richtext.getContent($('#content').contents())
    let blog = new Blog();
    blog.title = $('#title').text();
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
  closeText: EventEmitter<any> = new EventEmitter<any>();

  hidePost() {
    this.closeText.emit(false) //set postMess to false
  }

}

interface Dictionary {
  [ index: string ]: boolean
}

