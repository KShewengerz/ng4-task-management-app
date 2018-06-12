import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { BasicInfoComponent } from "./basic-info/basic-info.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

import { User } from "../../../../../../shared/interfaces";


@Component({
  moduleId    : module.id,
  selector    : "tms-profile",
  templateUrl : "profile.component.html",
  styleUrls   : ["profile.component.css", "../../landing/signup/signup.component.css"],
  entryComponents : [
    BasicInfoComponent,
    ResetPasswordComponent
  ]
})
export class ProfileComponent implements OnInit {
  
  users: User[] = [];
  user: User;
  
  isBasic: boolean = true;
  
  constructor(private router: Router,
              private route: ActivatedRoute) {}
  
  ngOnInit() {
    const session = localStorage.getItem("user");
    
    this.user  = JSON.parse(session);
    this.users = this.route.snapshot.data.users.filter(user => user.id != this.user.id);
  }
  

}
