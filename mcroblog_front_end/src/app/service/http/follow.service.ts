/**
 * Created by tianzhang on 2017/1/21.
 */
import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Follow} from "../../model/user";
import {Observable} from "rxjs";
@Injectable()
export class FollowService {

  constructor(private http: Http,
              private authenticationService: AuthenticationService,) {
  }

  follow_url = this.authenticationService.getApi()+'follow/'

  getFollowUrl() {
    return this.follow_url;
  }

  createFollow(follow):Observable<any>  {
    let follow_data = new Follow()
    follow_data.follower=follow.id
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.getFollowUrl(), JSON.stringify(follow_data), options)
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
}
