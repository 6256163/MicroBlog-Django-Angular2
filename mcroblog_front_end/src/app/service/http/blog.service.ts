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
@Injectable()
export class BlogService {

  private blog_url = this.authentication.getApi() + 'blog/';

  getBlogUrl() {
    return this.blog_url;
  }

  constructor(private  http: Http,
              private router: Router,
              private authentication: AuthenticationService,) {
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


  /*
   let blogs= [
   {
   id: 1,
   title: 'title1',
   images: ['media_for_dev/web1.png'],
   content: 'content1',
   user: 'user1',
   pub_date: new Date().getDate(),
   tag: '#tag1',
   },

   {
   id: 2,
   title: 'title2',
   images: ['media_for_dev/web1.png'],
   content: 'content2',
   user: 'user2',
   pub_date: new Date().getDate(),
   tag: '#tag2',
   },

   {
   id: 3,
   title: 'title3',
   images: ['media_for_dev/web1.png'],
   content: 'content3',
   user: 'user3',
   pub_date: new Date().getDate(),
   tag: '#tag3',
   },

   {
   id: 4,
   title: 'title4',
   images: ['media_for_dev/web1.png'],
   content: 'content4',
   user: 'user4',
   pub_date: new Date().getDate(),
   tag: '#tag4',
   }
   ]
   */

}
