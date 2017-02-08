/**
 * Created by tianzhang on 2017/1/1.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs";
import {User, UserExtend} from "../../model/user";

@Injectable()
export class AuthenticationService {

  authentication=false;
  private api = 'https://api.catchcat.top/';
  getApi(){
    return this.api;
  }
  private static = 'https://static.catchcat.top/';
  getStatic(){
    return this.static;
  }
  private login_url = 'api/v1/auth/login/';
  getLoginUrl(){
    return this.login_url;
  }
  private logout_url = 'logout/';
  getLoglouUrl(){
    return this.logout_url;
  }
  private islogin_url = 'islogin/'
  getIsloginUrl(){
    return this.islogin_url;
  }
  private register_url = 'register/'
  getRegisterUrl(){
    return this.register_url;
  }




  constructor(private http: Http) {
  }

  user = new User()
  user_extend = new UserExtend()

  register(register_model){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.getApi()+this.getRegisterUrl(), JSON.stringify(register_model), options)
      .map((res: Response) => {
        if (res) {
          if (res.status === 201) {
            let login_model = {
              'username': register_model.username,
              'password': register_model.password,
            }
            return [{status: res.status, json: res}]
          }
        }
      })
      .catch((error: any) => {
        if (error.status === 500) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 400) {
          return Observable.throw(new Error(error._body));
        }
        else if (error.status === 403) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 401) {
          return Observable.throw(new Error(error.status));
        }
      });
  }

  login(login_model) {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.getApi()+this.getLoginUrl(), JSON.stringify(login_model), options)
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            this.authentication = true;
            this.user.username = res.json().username;
            this.user.email = res.json().email;

            return [{status: res.status, json: res}]
          }
        }
      })
      .catch((error: any) => {
        if (error.status === 500) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 400) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 403) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 401) {
          return Observable.throw(new Error(error.status));
        }
      });

  }

  logout() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.get(this.getApi()+this.getLoglouUrl(), options)
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            this.authentication = false;
            return [{status: res.status, json: res}]
          }
        }
      });

  }

  isLogin(): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.get(this.getApi()+this.getIsloginUrl(), options)
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            this.authentication = true;
            this.user = res.json().user
            this.user_extend= res.json().user_extend
            return [{status: res.status, json: res}]
          }
        }
      })
      .catch((error: any) => {
        if (error.status === 500) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 400) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 403) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 401) {
          return Observable.throw(new Error(error.status));
        }
      });
  }
}
