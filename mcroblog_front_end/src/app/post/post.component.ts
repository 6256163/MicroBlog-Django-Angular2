import {Component, trigger, transition, style, animate, ViewChild, ViewContainerRef,} from '@angular/core';
import {Blog} from "../model/blog";
import {BlogService} from "../service/http/blog.service";
import {FileUploadService} from "../service/http/file.upload.service";
import {AuthenticationService} from "../service/http/authentication.service";
import {PopinfoService} from "../popinfo/popinfo.service";
import {UserService} from "../service/http/user.service";
import {PopinfoComponent} from "../popinfo/popinfo.component";
/**
 * Created by tianzhang on 2016/12/30.
 */
@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
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
export class PostComponent {

  blog = new Blog();
  errorMessage: any;


  constructor(private blogService: BlogService,
              private userService: UserService,
              private fileService: FileUploadService,
              private authenticationService: AuthenticationService,
              private popinfoService: PopinfoService,) {
    this.blog.content = new Array();
    this.blog.content.push('');
  }

  @ViewChild('selfinfo', {read: ViewContainerRef})
  private selfinfo: any; //dynamic target


  showPopinfo(eventTarget, user_id) {
    this.popinfoService.loadCom(this.selfinfo, PopinfoComponent, $(eventTarget.currentTarget),user_id)

  }


  uploadImg(event) {
    event.preventDefault();
    $('#uploadImage').click();
  }

  processUpload(event) {
    this.fileService.uploadFile(event.srcElement.files)
      .subscribe(
        body => {
          let $div = $('#content>div').val('').clone(true)
          $('#content>div[contenteditable="true"]').append(
            $('<img/>')
              .attr("src", this.authenticationService.getStatic() + body)
              .css({
                'width': $('#content').width(),
                'height': 'auto',
                'marginButton': '5px'
              })
          ).attr('contenteditable', 'false');
          $('#content').append($div.html('').attr('contenteditable', 'true'))

        },
        error => this.errorMessage = <any>error);
  }

  private textPost: boolean = false;
  private photoPost: boolean = false;
  private linkPost: boolean = false;
  private chatPost: boolean = false;
  private audioPost: boolean = false;
  private videoPost: boolean = false;
  private postMess: boolean = false;

  hidePost(event) {
    this.postMess = event;
  }

  showTextPost() {
    this.postMess = true;
    this.textPost = !this.textPost;
    this.photoPost = false;
    this.linkPost = false;
    this.chatPost = false;
    this.audioPost = false;
    this.videoPost = false
  }

  showPhotoPost() {
    this.postMess = true;
    this.textPost = false;
    this.photoPost = !this.photoPost;
    this.linkPost = false;
    this.chatPost = false;
    this.audioPost = false;
    this.videoPost = false
  }

  showLinkPost() {
    this.postMess = true;
    this.textPost = false;
    this.photoPost = false;
    this.linkPost = !this.linkPost;
    this.chatPost = false;
    this.audioPost = false;
    this.videoPost = false
  }

  showChatPost() {
    this.postMess = true;
    this.textPost = false;
    this.photoPost = false;
    this.linkPost = false;
    this.chatPost = !this.chatPost;
    this.audioPost = false;
    this.videoPost = false
  }

  showAudioPost() {
    this.postMess = true;
    this.textPost = false;
    this.photoPost = false;
    this.linkPost = false;
    this.chatPost = false;
    this.audioPost = !this.audioPost;
    this.videoPost = false
  }

  showVedioPost() {
    this.postMess = true;
    this.textPost = false;
    this.photoPost = false;
    this.linkPost = false;
    this.chatPost = false;
    this.audioPost = false;
    this.videoPost = !this.videoPost
  }
}
