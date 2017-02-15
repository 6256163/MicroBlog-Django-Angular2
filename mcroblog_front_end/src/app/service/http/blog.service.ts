/**
 * Created by tianzhang on 2016/12/22.
 */
import {Injectable} from "@angular/core";
import {Blog} from "../../model/blog";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {map} from "rxjs/operator/map";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {DecodeService} from "../decode/decode.service";
import {DomSanitizer} from "@angular/platform-browser";
@Injectable()
export class BlogService {

  private blog_url = this.authentication.getApi() + 'blog/';

  getBlogUrl() {
    return this.blog_url;
  }

  constructor(private  http: Http,
              private router: Router,
              private authentication: AuthenticationService,
              private decode: DecodeService,
              private sanitizer: DomSanitizer,) {
  }

  postBlog(blogModel): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.getBlogUrl(), JSON.stringify(blogModel), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBlogs(url = this.getBlogUrl()): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = {'results': [], 'next': ''};
    body.results = res.json().results;
    body.next = res.json().next
    return body;
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }


  decodeBlogs(blogs_object){
    let blogs = []
    blogs_object.forEach((item, index) => {
      blogs.push(item)
      let saveHTML: any[] = [];
      for (let content of blogs_object[index].content.split('@')) {
        let $content_dom = $(this.decode.b64DecodeUnicode(content));
        if ($content_dom[0].nodeName == 'P') {

        }
        else if ($content_dom[0].nodeName == 'IMG') {
          $content_dom.attr('src', this.authentication.getStatic() + $content_dom.attr('src'))
        }
        else if ($content_dom[0].nodeName == 'EMBED') {
          $content_dom.show();
        }
        saveHTML.push(this.sanitizer.bypassSecurityTrustHtml($content_dom[0].outerHTML));
      }
      blogs[index].content = saveHTML;
      blogs[index].title = this.decode.b64DecodeUnicode(blogs[index].title)
      blogs[index].tags = this.decode.b64DecodeUnicode(blogs[index].tags)

    });
    return blogs
  }
}
