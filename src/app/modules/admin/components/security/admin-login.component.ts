import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthService } from '../../services/admin-auth.service';

declare var $: any;

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styles: []
})
export class AdminLoginComponent implements OnInit {

  constructor(private router: Router, private titleService: Title, private metaService: Meta, private toastr: ToastrService,
    private adminAuthService: AdminAuthService) {
    this.titleService.setTitle('Rocery Admin : Login');
    this.metaService.addTag({ name: 'keywords', content: '' });
    this.metaService.addTag({ name: 'description', content: '' });
    this.metaService.addTag({ name: 'author', content: '' });
    this.metaService.addTag({ name: 'robots', content: 'index, follow' });
  }

  ngOnInit() {
  }

  login(username, password) {
    $("#btnSubmit").button('loading');
    let credentials = { "username": username, "password": password }
    this.adminAuthService.login(credentials).subscribe((resp) => {
      if (resp.status == 200) {
        $("#btnSubmit").button('reset');
        this.toastr.success("Login Successfully");
        window.location.reload();
      }
      else {
        $("#btnSubmit").button('reset');
        this.toastr.error("Authentication Failed!");
      }
    });
  }

}
