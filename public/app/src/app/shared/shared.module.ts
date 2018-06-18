import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { AuthGuardService } from "./services/auth-guard.service";
import { ErrorHandlerService } from "./services/error-handler.service";

import { UserService } from "./user/user.service";
import { ProjectService } from "./project/project.service";

import { UserResolver, UserListResolver } from "./user/user-resolver.service";
import { ProjectListResolver } from "./project/project-resolver.service";


@NgModule({
  imports: [ HttpModule ],
  providers: [
    AuthGuardService,
    ErrorHandlerService,
    UserService,
    ProjectService,
    UserResolver,
    UserListResolver,
    ProjectListResolver
  ]
})
export class SharedModule { }
