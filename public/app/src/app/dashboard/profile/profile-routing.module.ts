import { RouterModule, Routes } from "@angular/router";

import { ProfileComponent } from "./profile.component";

import { UserListResolver } from "../../shared/user/user-resolver.service";


const routes: Routes = [
  { 
    path: "", 
    component: ProfileComponent,
    resolve: { users: UserListResolver }
  }
];

export const ProfileRouting = RouterModule.forChild(routes);
