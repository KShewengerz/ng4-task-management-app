import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(public router: Router) {
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isUserSessionExists = localStorage.getItem("user");
    
    if (!isUserSessionExists && state.url != "/") {
      this.router.navigate(["/"]);
      return false;
    }
    else if (isUserSessionExists && state.url === "/") {
      this.router.navigate(["/dashboard/home"]);
      return false;
    }
    
    return true;
  }
}
