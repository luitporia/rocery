import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private token = null;
  private headers = null;
  private options = null;

  constructor(private http: Http, private router: Router, private cookieService: CookieService) {
    this.token = this.cookieService.get('jwtToken');
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getHttpOptions(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  uploadImage(formData) {
    // formData should have 3 fields: source_type, source_id
    let tokenStr = this.token.split('\'');
    let headers = new Headers({ 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.post(apiUrl + "UploadImage", formData, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getImages(sourceId) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetImages/" + sourceId, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getImageById(sourceId, imageId) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetImageById/" + sourceId + "/" + imageId, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }
}
