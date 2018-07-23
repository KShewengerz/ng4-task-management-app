import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { UserService } from "../user/user.service";


@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(public router: Router,
              private userService: UserService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isUserSessionExists  = this.userService.fetchCurrentUserSession();
    const isDashboardPrefixUrl = state.url.split("/")[1] === "dashboard";
    
    if ((isUserSessionExists && state.url === "/login") || isUserSessionExists && state.url === "/signup") {
      this.router.navigate(["/dashboard/task"]);
      return false;
    }
    else if (!isUserSessionExists && isDashboardPrefixUrl) {
      this.router.navigate(["/login"]);
      return false;
    }
    
    return true;
  }
}
