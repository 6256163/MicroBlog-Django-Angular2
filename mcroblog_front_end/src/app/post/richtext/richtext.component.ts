/**
 * Created by tianzhang on 2017/1/15.
 */
import {Component, trigger, transition, style, animate, OnChanges, Input, OnInit} from "@angular/core";
import {FileUploadService} from "../../service/http/file.upload.service";
import {AuthenticationService} from "../../service/http/authentication.service";
@Component({
  selector: 'rich-text',
  templateUrl: './richtext.component.html',
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
export class RichTextComponent implements OnInit {

  target: any;
  @Input() placeholder: any;

  constructor(private fileService: FileUploadService,
              private authentication: AuthenticationService,) {

  }

  ngOnInit() {
    $('#content').attr('data-placeholder', this.placeholder)
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

      /*  ▼ 判断所选文本的样式
       for (let key in this.editor_selection) {
       this.editor_selection[key] = false;
       }
       for (let i = 0; $(window.getSelection().anchorNode).parents()[i].localName != 'div'; i++) {
       this.editor_selection[$(window.getSelection().anchorNode).parents()[i].localName] = true;
       }
       for (let i = 0; $(window.getSelection().focusNode).parents()[i].localName != 'div'; i++) {
       this.editor_selection[$(window.getSelection().focusNode).parents()[i].localName] = true;
       }
       */

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

  getContent($contents) {
    let this_ = this;
    let content: any[] = [];
    $.each($contents, function (index, value) {
      if (value.nodeName == '#text') {
        content.push('<p>' + $contents.eq(index).text() + '</p>')
      }
      else if (value.nodeName == 'DIV') {
        if ($contents.eq(index).find('img').length) {
          content.push(
            '<img src="' +
            $contents.eq(index).find('img').attr('src')
              .replace(this_.authentication.getStatic(), '') +
            '"></img>'
          )
        }
        else if ($contents.eq(index).find('embed').length) {
          content.push($contents.eq(index).find('embed')[0].outerHTML)
        }
        else if ($contents.eq(index).find('br').length) {
          content.push('<br>')
        }
        else {
          content.push('<p>' + $contents.eq(index).html() + '</p>')
        }
      }
    })

    return content;
  }


  uploadImg(event, ctrl_id) {
    event.preventDefault();
    $(ctrl_id).click();
  }

  errorMessage: any;

  processUploadImg(event, files) {
    this.fileService.uploadFile(files)
      .subscribe(
        body => {
          if (!this.target) {
            this.target = $(document.getElementById('content'))
          }
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
    if ($(url).length == 1 && $(url)[0].nodeName == "EMBED") {
      if (this.target.attr('id') == 'content') {
        this.target = $('<div></div>').appendTo(this.target)
      }
      this.target
        .css({
          'position': 'relative',
          'userSelect': 'none'
        })
        .attr('contenteditable', 'false')
        .prepend(
          $(url)
            .css({
              'width': '100%'
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
}


interface Dictionary {
  [ index: string ]: boolean
}
