import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Util } from 'src/app/modules/shared/models/util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  isSessionExists: boolean = false;
  displayName: string;
  isServiceProfile: boolean = false;

  constructor(private router: Router, public toastr: ToastrService , private vcr: ViewContainerRef, private cookieService: CookieService) { }

  ngOnInit() {
    this.displayName = this.cookieService.get("currentUserName");
    if (!Util.stringIsNullEmptyOrUndefined(this.displayName)) {
      this.isSessionExists = true;
    }
  }

  getSessionData(displayName: string) {
    this.displayName = "";
    this.displayName = displayName;
    this.isSessionExists = true;
    this.isServiceProfile = false;
    let isServiceProfile = this.cookieService.get("is_service_profile");
    if (!Util.stringIsNullEmptyOrUndefined(isServiceProfile) && isServiceProfile != "false") {
      this.isServiceProfile = true;
    }
  }

  logout() {
    this.cookieService.set("jwtToken", null);
    this.cookieService.set("currentUserName", null);
    this.cookieService.delete("jwtToken");
    this.cookieService.delete("currentUserName");
    this.cookieService.deleteAll();
    window.location.reload();
  }

}
