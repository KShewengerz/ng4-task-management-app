import { Component, OnInit, Input } from "@angular/core";

import { User } from "../../../../../../../shared/interfaces";


@Component({
  moduleId    : module.id,
  selector    : "tms-reset-password",
  templateUrl : "reset-password.component.html",
  styleUrls   : ["reset-password.component.css", "../../../landing/signup/signup.component.css"]
})
export class ResetPasswordComponent implements OnInit {

  @Input() user: User;
  
  constructor() { }

  ngOnInit() {}

}
