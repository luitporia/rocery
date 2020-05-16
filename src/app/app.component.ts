import { Component, LOCALE_ID, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/modules/shared/models/util';

declare let ga: Function;
declare var $: any;

@Component({
  selector: 'app-root',
  template: '<div id="overlay"><div class="loader"></div></div><app-admin *ngIf="isAdminRequest"></app-admin><app-public *ngIf="!isAdminRequest"></app-public>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'order-delivery-system';
  jwtToken = "";
  isSessionExists: Boolean = false;
  publicUserInfo: string;
  paths = [];
  isAdminRequest: boolean = false;

  constructor(@Inject(LOCALE_ID) protected localeId: string, private router: Router, private activatedRoute: ActivatedRoute,
    private cookieService: CookieService, private location: Location) {
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

    // TEMP CODE TO TEST IN LOCAL ENVIRONMENT
    /*
    if (environment.jwtToken != null) {
      this.cookieService.set("currentUserName", "TESTUSER");
      this.cookieService.set("jwtToken", environment.jwtToken);
    }
    */
  }

  ngOnInit() {
    this.jwtToken = this.cookieService.get("jwtToken");
    this.publicUserInfo = this.cookieService.get("publicUserInfo");
    if (!Util.stringIsNullEmptyOrUndefined(this.jwtToken)) {
      this.isSessionExists = true;

      switch (this.location.path()) {
        case "":
          this.router.navigateByUrl("/home");
          break;
      }

      this.navigateToAdminPortal();
    }

    this.navigateToAdminPortal();
  }

  navigateToAdminPortal() {
    this.paths = this.location.path().split('/');
    switch (this.paths[1]) {
      case "admin":
        this.isAdminRequest = true;
        break;
    }
  }
}
