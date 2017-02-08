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

  bold_text(event) {
    let selected = this.getSelectionHtml()

    //加粗
    if (this.editor_selection['b'] != true) {
      var re = new RegExp("<b>", "g");
      selected = selected.replace(re, '');
      var re = new RegExp("</b>", "g");
      selected = selected.replace(re, '');
      if (selected.indexOf('<') != -1) {
        selected = selected.replace(/>(.*?)</g, function () {
          arguments[0] = arguments[0].replace('<', '');
          arguments[0] = arguments[0].replace('>', '');
          return '>' + arguments[0].bold() + '<'
        })
        selected = selected.replace(/^(.*?)</g, function () {
          arguments[0] = arguments[0].replace('<', '');
          return arguments[0].bold() + '<'
        })
        selected = selected.replace(/>(?!(.*<))(.*?)$/g, function () {
          arguments[0] = arguments[0].replace('>', '');
          return '>' + arguments[0].bold()
        })

        selected = selected.replace('</b><b>', '');
        selected = selected.replace('<b></b>', '');
        selected = selected.replace('<b><b>', '');
        selected.replace('</b></b>', '');

      }
      else {
        selected = selected.bold();
      }
    }
    else {
      let anchorNode: any = window.getSelection().anchorNode;
      let focusNode: any = window.getSelection().focusNode;
      let sel_doc: any = window.getSelection().getRangeAt(0).cloneContents();
      for (let i = 0; ; i++) {
        $.each($(anchorNode).parents(), function (index, value) {
          if (value.nodeName.toUpperCase() == 'DIV') {

          }
        })
      }
    }
    return selected;
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
    ;
  }


  editor_selection: Dictionary = {
    'a': false,
    'b': false,
    'i': false,
    'h2': false,
    'ol': false,
    'ul': false,
    'blockquote': false,
  };


  load_InsertTool_TextStyle(event) {
    let $parent = $(window.getSelection().anchorNode)
    if ($parent[0].nodeName == '#text') {
      $parent = $(window.getSelection().anchorNode.parentElement)
    }
    this.target = $parent;
    if (window.getSelection().toString().trim() == '') {
      $('#editor_plugin').hide()
      for (let key in this.editor_selection) {
        this.editor_selection[key] = false;
      }
    }
    else {
      for (let key in this.editor_selection) {
        this.editor_selection[key] = false;
      }
      for (let i = 0; $(window.getSelection().anchorNode).parents()[i].localName != 'div'; i++) {
        this.editor_selection[$(window.getSelection().anchorNode).parents()[i].localName] = true;
      }
      for (let i = 0; $(window.getSelection().focusNode).parents()[i].localName != 'div'; i++) {
        this.editor_selection[$(window.getSelection().focusNode).parents()[i].localName] = true;
      }
      $('#editor_plugin')
        .show()
        .css({
          'top': window.getSelection().getRangeAt(0).getBoundingClientRect().top +
          $(document).scrollTop() - $('#editor_plugin').outerHeight() - 5,
          'left': window.getSelection().getRangeAt(0).getBoundingClientRect().left +
          window.getSelection().getRangeAt(0).getBoundingClientRect().width / 2 -
          $('#editor_plugin').outerWidth() / 2,
        })
    }

    if ($parent.text().trim().length == 0) {
      $('#insert_tool')
        .show()
        .css({
          'top': $parent.offset().top,
          'left': $parent.offset().left + $parent.outerWidth() - $('#insert_tool').outerWidth(),
        })
    }
    else {
      $('#insert_tool').hide()
    }
  }

  getSelectionHtml(): any {
    var html = "";
    var sel = window.getSelection();
    if (sel.rangeCount) {
      for (let i = 0, len = sel.rangeCount; i < len; ++i) {
        for (let j = 0; j < sel.getRangeAt(i).cloneContents().childNodes.length; j++) {
          let tag = sel.getRangeAt(i).cloneContents().childNodes[j].localName ?
            sel.getRangeAt(i).cloneContents().childNodes[j].localName : "";
          let start_tag = tag ? ('<' + tag + '>') : '';
          let end_tag = tag ? ('</' + tag + '>') : '';
          html += start_tag + ($(sel.getRangeAt(i).cloneContents().childNodes[j]).html() ?
              $(sel.getRangeAt(i).cloneContents().childNodes[j]).html() :
              $(sel.getRangeAt(i).cloneContents().childNodes[j]).text()) + end_tag;
        }
      }
    }
    return html;
  }


  uploadImg(event, ctrl_id) {
    event.preventDefault();
    $(ctrl_id).click();
  }

  processUploadImg(event) {
    this.fileService.uploadFile(event.srcElement.files)
      .subscribe(
        body => {
          if (this.target.attr('id') == 'content') {
            this.target = $('<div></div>').appendTo(this.target)
          }
          this.target
            .css({
              'position': 'relative',
            })
            .prepend(
              $('<figure></figure>')
                .addClass('insert_fig')
                .append(
                  $('<img/>')
                    .attr('src', this.authentication.getStatic() + body)
                    .addClass('insert_img')
                )
            )
            .append(
              $('<div></div>')
                .addClass('insert_cross')
                .click(function () {
                  $(this).parent().remove()
                })
            )
            .after($('<div><br/></div>').focus())
            .children('br').remove();
          $('#insert_tool').hide();

        },
        error => this.errorMessage = <any>error);
    event.srcElement.value = '';
  }


  insert_video_dialog = false;
  insert_video_error = ''

  close_insert_video() {
    this.insert_video_dialog = false;
    $('#insert-video')
      .hide()
  }

  show_insert_video(event) {
    this.insert_video_dialog = true;
    $('#insert-video')
      .show()
      .css({
        'top': this.target.offset().top,
        'left': this.target.offset().left,
      })
  }

  insert_video() {
    let url = $('#video_url').text();
    if (
      url.indexOf('http://player.youku.com/'  /* youku */) == 0 ||
      url.indexOf('http://player.video.qiyi.com/'  /* iqiyi */) == 0) {
      if (this.target.attr('id') == 'content') {
        this.target = $('<div></div>').appendTo(this.target)
      }
      this.target
        .css({
          'position': 'relative',
        })
        .prepend(
          $('<div></div>')
            .attr('data-src', url)
            .attr('data-type', 'video')
            .css({
              'width': "100%",
              'height': '300px',
            })
        )
        .append(
          $('<div></div>')
            .addClass('insert_cross')
            .click(function () {
              $(this).parent().remove()
            })
        )
        .after($('<div><br/></div>').focus())
        .children('br').remove();
      $('#insert_tool').hide();
      this.insert_video_dialog = false;
      this.insert_video_error = '';
    }
    else {
      this.insert_video_error = 'wrong code'
    }
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

