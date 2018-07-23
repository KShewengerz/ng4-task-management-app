import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserImageHeaderService } from "./user-image-header.service";
import { UserService } from "../../../shared/user/user.service";

import { User } from "../../../../../../../shared/interfaces/user";


@Component({
  moduleId: module.id,
  selector    : "tms-user-image-header",
  templateUrl : "user-image-header.component.html",
  styleUrls   : ["user-image-header.component.css"]
})
export class UserImageHeaderComponent implements OnInit {
  
  fullName: string;
  
  constructor(private router: Router,
              private userImageHeaderService: UserImageHeaderService,
              private userService: UserService) {}
              
  ngOnInit(): void {
    const user    = this.userService.fetchCurrentUserSession();
    this.fullName = `${user.firstName} ${user.lastName}`;
  }
  
  logOut(): void {
    sessionStorage.removeItem("user");
    
    this.userImageHeaderService
    .logOut()
    .subscribe(response => this.router.navigate(["/"]));
  }

}
