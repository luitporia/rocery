import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../../shared/services/config.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private headers = null;
  private options = null;

  constructor(private http: Http, private cookieService: CookieService, public configService: ConfigService) {
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  validateJwt() {
    let token = localStorage.getItem("jwtToken");
    let tokenStr = token.split('\'');
    let tokenData = {"token": tokenStr[1]};
    return this.http.post(apiUrl + "ValidateToken", tokenData, this.options).pipe(
      map((res: Response) => {
        return res;
      },
      catchError(this.configService.handleError)
    ));
  }
}
