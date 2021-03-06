/**
 * Created by tianzhang on 2017/1/1.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User, UserExtend, UserExtendWithBlog} from "../../model/user";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {Blog} from "../../model/blog";

@Injectable()
export class UserService {
  constructor(private http: Http,
              private authenticationService: AuthenticationService,) {
  }

  user_url = 'users/';

  getUserUrl() {
    return this.user_url;
  }

  user_extend_url = 'u/';

  getUserExtendUrl() {
    return this.user_extend_url;
  }

  show_user_blog = false;
  user_extend = new UserExtend();
  user_extend_with_blog = new UserExtendWithBlog();
  users: any[] = [];
  user_id: number;

  show_blog(user_id) {
    this.show_user_blog = true;
    this.getById(user_id);
    $('body').css({'overflow': 'hidden'})
  }

  hide_blog() {
    this.show_user_blog = false;
    $('body').css({'overflow': 'auto'})
  }

  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers, withCredentials: true,});

  getAll(): Promise<any> {
    return this.http.get(this.authenticationService.getApi() + this.user_extend_url, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getById(id: number): Promise<UserExtendWithBlog> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true,});
    return this.http.get(this.authenticationService.getApi() + this.user_extend_url + id + '/', this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  getByNextPage(url:string):Promise<any> {
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }


}
