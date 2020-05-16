import { Component, OnInit, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
import { AuthApiService } from '../services/auth-api.service';
import { Auth } from '../models/auth';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  @Output() sessionData = new EventEmitter();
  submitted = false;
  authData: Auth;
  isPhoneNumber: boolean = true;
  siteVisited: number;
  isUserValid: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, public toastr: ToastrService , private vcr: ViewContainerRef, 
    private authService: AuthApiService) { }

  ngOnInit() {
    this.authData = new Auth();
  }

  callAppLoginService(authData: any) {
    this.authService.login(authData).subscribe(res => {
      if (res.status == 200) {
        this.toastr.success("Sign In Successfull!");
        $('#closeLoginModal').click();
        this.sessionData.emit(res.json()["display_name"]);
      }
      else {
        this.toastr.error("Error! Unauthorized");
        this.isUserValid = false;
      }
    });
    this.submitted = false;
  }
  
  openTerms() {
    window.open("/terms-and-conditions", "_blank");
  }

}
