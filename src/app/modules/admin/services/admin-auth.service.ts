import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from '../../shared/services/config.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private headers = null;
  private options = null;

  constructor(private http: Http, private cookieService: CookieService, public toastr: ToastrService, public configService: ConfigService) {
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  sendOTP(phone) {
    let phoneData = { "phone": phone }
    return this.http.post(apiUrl + "SendOTP", phoneData, this.options).pipe(
      map((res: Response) => {
        return res;
      }));
  }

  login(credentials) {
    return this.http.post(apiUrl + "AdminLogin", credentials, this.options).pipe(
      map((res: Response) => {
        if (res != null && res.status == 200) {
          localStorage.setItem("currentUserName", null);
          localStorage.setItem("jwtToken", null);
          localStorage.setItem("currentUserName", res.json()["display_name"]);
          localStorage.setItem("jwtToken", res.json()["token"]);
          //this.cookieService.set("currentUserName", res.json()["display_name"]);
          //this.cookieService.set("jwtToken", res.json()["token"]);
        }
        else {
          this.toastr.error("Authentication Failed!");
        }
        return res;
      }),
      catchError(this.configService.handleError)
    );
  }

  logout() {
    //this.cookieService.set("currentUserName", null);
    //this.cookieService.set("jwtToken", null);
    //this.cookieService.delete("currentUserName", "/");
    //this.cookieService.delete("jwtToken", "/");
    localStorage.removeItem("currentUserName");
    localStorage.removeItem("jwtToken");
  }
}
