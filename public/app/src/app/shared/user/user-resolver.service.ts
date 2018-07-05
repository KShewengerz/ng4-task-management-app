import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

import { User } from "../../../../../../shared/interfaces/-index";

import { UserService } from "./user.service";


@Injectable()
export class UserListResolver implements Resolve<User[]> {
  
  constructor(private userService: UserService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.userService.fetchAllUsers();
  }
  
}

@Injectable()
export class UserResolver implements Resolve<User> {
  
  constructor(private userService: UserService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const session = sessionStorage.getItem("user");
    const id = JSON.parse(session).id;
    
    return this.userService.fetchUser(id);
  }
  
}
