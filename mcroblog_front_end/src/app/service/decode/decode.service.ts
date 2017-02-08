import {Injectable} from "@angular/core";
/**
 * Created by tianzhang on 2017/1/17.
 */
Injectable()
export class DecodeService {

  b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

}
