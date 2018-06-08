import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { AuthGuardService } from "./services/auth-guard.service";
import { ErrorHandlerService } from "./services/error-handler.service";

import { UserService } from "./user/user.service";
import { UserListResolver } from "./user/user-resolver.service";


@NgModule({
  imports: [ HttpModule ],
  providers: [
    AuthGuardService,
    ErrorHandlerService,
    UserService,
    UserListResolver
  ]
})
export class SharedModule { }
