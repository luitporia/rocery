import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private headers = null;
  private options = null;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getLookups(lookupType) {
    let lookupPayload = {"lookup_type": lookupType};
    return this.http.post(apiUrl + "GetLookupByType", lookupPayload, this.options).pipe(
      map((res: Response) => {
        return res;
      }));
  }
}
