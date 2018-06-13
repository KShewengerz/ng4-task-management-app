import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { UserImageHeaderService } from "./user-image-header.service";


@Component({
  moduleId: module.id,
  selector    : "tms-user-image-header",
  templateUrl : "user-image-header.component.html",
  styleUrls   : ["user-image-header.component.css"]
})
export class UserImageHeaderComponent {
  
  constructor(private router: Router,
              private userImageHeaderService: UserImageHeaderService) {
  }
  
  logOut(): void {
    localStorage.removeItem("user");
    
    this.userImageHeaderService
    .logOut()
    .subscribe(response => this.router.navigate(["/"]));
  }

}
