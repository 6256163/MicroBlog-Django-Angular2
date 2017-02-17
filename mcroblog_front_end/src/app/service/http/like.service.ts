/**
 * Created by tianzhang on 2017/2/16.
 */
import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Follow, Like} from "../../model/user";
import {Observable} from "rxjs";
@Injectable()
export class LikeService {

  constructor(private http: Http,
              private authenticationService: AuthenticationService,) {
  }

  like_url = this.authenticationService.getApi() + 'like/'

  getLikeUrl() {
    return this.like_url;
  }

  createlike(blog_id): Observable<any> {
    let like_data = new Like()
    like_data.blog = blog_id
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.getLikeUrl(), JSON.stringify(like_data), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  distroy(blog_id): Observable<any> {
    let url = this.getLikeUrl()+blog_id+'/'
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.delete(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json()
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
}
