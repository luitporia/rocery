import { Component, LOCALE_ID, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminAuthService } from 'src/app/modules/admin/services/admin-auth.service';
import { SecurityService } from 'src/app/modules/shared/services/security.service';
import { Util } from 'src/app/modules/shared/models/util';

declare let ga: Function;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {

  paths = [];
  jwtToken = "";
  display_name = "";
  isSessionExists: Boolean = false;
  isAdminRequest: boolean = false;

  constructor(@Inject(LOCALE_ID) protected localeId: string, private router: Router, private activatedRoute: ActivatedRoute,
    private cookieService: CookieService, private location: Location, private adminAuthService: AdminAuthService, 
    private securityService: SecurityService) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        ga('set', 'page', evt.urlAfterRedirects);
        ga('send', 'pageview');
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    //this.jwtToken = this.cookieService.get("jwtToken");
    //this.display_name = this.cookieService.get("currentUserName");
    this.jwtToken = localStorage.getItem("jwtToken");
    this.display_name = localStorage.getItem("currentUserName");
    if (!Util.stringIsNullEmptyOrUndefined(this.jwtToken) && this.display_name.toLowerCase() == "admin") {
      this.securityService.validateJwt().subscribe((resp) => {
        if (resp.status == 200 && resp.json()["code"] == "active") {
          this.isSessionExists = true;
          this.isAdminRequest = true;
          this.paths = this.location.path().split('/');
          if (this.paths[2] == "login") {
            this.router.navigateByUrl("/admin/analytics/dashboard");
          }
          else {
            this.navigateToAdminPortal(this.paths[3]);
          }
        }
        else {
          this.clearUserSession();
          this.redirectToLogin();
        }
      });
    }
    else {
      this.redirectToLogin();
    }
  }

  navigateToAdminPortal(page) {
    switch (page) {
      case "dashboard":
        this.router.navigateByUrl("/admin/analytics/dashboard");
        break;
      case "inventory":
        this.router.navigateByUrl("/admin/master-data/inventory");
        break;
      case "lookups":
        this.router.navigateByUrl("/admin/order/orders");
        break;
      case "places":
        this.router.navigateByUrl("/admin/master-data/places");
        break;
      case "localities":
        this.router.navigateByUrl("/admin/master-data/localities");
        break;
      case "landmarks":
        this.router.navigateByUrl("/admin/master-data/landmarks");
        break;
      case "lookups":
        this.router.navigateByUrl("/admin/master-data/lookups");
        break;
      default:
        this.router.navigateByUrl("/admin/analytics/dashboard");
        break;
    }
  }

  redirectToLogin() {
    this.router.navigateByUrl("/admin/login");
  }

  logout() {
    this.clearUserSession();
    window.location.reload();
  }

  clearUserSession() {
    localStorage.removeItem("currentUserName");
    localStorage.removeItem("jwtToken");
  }

}
