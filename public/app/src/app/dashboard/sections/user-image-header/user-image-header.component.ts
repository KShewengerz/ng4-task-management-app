import { Component } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  moduleId: module.id,
  selector: "tms-user-image-header",
  templateUrl: "user-image-header.component.html",
  styleUrls: ["user-image-header.component.css"]
})
export class UserImageHeaderComponent {
  
  constructor(private router: Router) {
  }
  
  logOut(): void {
    localStorage.removeItem("user");
    this.router.navigate(["/"]);
  }

}
