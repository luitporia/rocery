import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  token: any;

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.token = this.cookieService.get('jwtToken');
  }

  openInstaPage(name: string) {
    switch (name) {
      case "arunachal":

        break;
      case "assam":

        break;
      case "meghalaya":

        break;
      case "ne":

        break;
    }
  }

}