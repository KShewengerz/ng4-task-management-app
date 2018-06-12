import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { AuthGuardService } from "./services/auth-guard.service";
import { ErrorHandlerService } from "./services/error-handler.service";

import { UserService } from "./user/user.service";
import { UserResolver, UserListResolver } from "./user/user-resolver.service";


@NgModule({
  imports: [ HttpModule ],
  providers: [
    AuthGuardService,
    ErrorHandlerService,
    UserService,
    UserResolver,
    UserListResolver
  ]
})
export class SharedModule { }
