import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/modules/shared/models/util';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styles: []
})
export class SuccessComponent implements OnInit {

  message: string;
  routeLink: string;

  constructor() { }

  ngOnInit() {
    this.message = Util.stringIsNullEmptyOrUndefined(localStorage.getItem("successMessage")) ? "Operation Successfull" : localStorage.getItem("successMessage");
    this.routeLink = Util.stringIsNullEmptyOrUndefined(localStorage.getItem("routeLink")) ? null : localStorage.getItem("routeLink");
  }

}
