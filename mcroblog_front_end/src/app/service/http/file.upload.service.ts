/**
 * Created by tianzhang on 2017/1/3.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
@Injectable()
export class FileUploadService {

  private upload_url = 'blog_image_upload/';

  getUploadUrl() {
    return this.upload_url;
  }

  constructor(private http: Http,
              private authentication: AuthenticationService,) {

  }


  uploadFile(files: File[]): Observable<any> {
    return Observable.create(observer => {
      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i], files[i].name? files[i].name: 'temp_name.png');
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(xhr.response);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', this.authentication.getApi() + this.getUploadUrl(), true);
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, withCredentials: true});

      xhr.withCredentials = true;
      xhr.setRequestHeader('X-CSRFToken', this.getCookie('csrftoken'));
      xhr.send(formData);
    })

  }

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
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



