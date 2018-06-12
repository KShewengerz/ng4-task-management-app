import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MdlModule } from "@angular-mdl/core";
import { MdlPopoverModule } from "@angular-mdl/popover";
import { MdlSelectModule } from "@angular-mdl/select";

import { BasicInfoComponent } from "./basic-info/basic-info.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

import { UserService } from "../../shared/user/user.service";
import { ErrorHandlerService } from "../../shared/services/error-handler.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    MdlPopoverModule,
    MdlSelectModule
  ],
  declarations: [
    BasicInfoComponent,
    ResetPasswordComponent
  ],
  providers: [
    UserService,
    ErrorHandlerService
  ],
  exports: [
    BasicInfoComponent,
    ResetPasswordComponent
  ]
})
export class ProfileModule { }
