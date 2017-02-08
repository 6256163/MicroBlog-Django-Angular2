/**
 * Created by tianzhang on 2017/1/1.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User, UserExtend} from "../../model/user";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

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
  users: any[] = [];
  user_id:number;

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

  getById(id: number): Promise<UserExtend> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true,});
    return this.http.get(this.authenticationService.getApi() + this.user_extend_url + id + '/', this.options)
      .toPromise()
      .then(response => response.json() as UserExtend)
      .catch(this.handleError)
  }

  create(user: User) {
    return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }
}
