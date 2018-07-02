import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MdlModule } from "@angular-mdl/core";
import { MdlPopoverModule } from "@angular-mdl/popover";
import { MdlSelectModule } from "@angular-mdl/select";

import { SectionsModule } from "../sections/sections.module";

import { ProfileComponent } from "./profile.component";
import { BasicInfoComponent } from "./basic-info/basic-info.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

import { UserService } from "../../shared/user/user.service";
import { ErrorHandlerService } from "../../shared/services/error-handler.service";
import { ChangePasswordService } from "./change-password/change-password.service";

import { ProfileRouting } from "./profile-routing.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    MdlPopoverModule,
    MdlSelectModule,
    SectionsModule,
    ProfileRouting
  ],
  declarations: [
    ProfileComponent,
    BasicInfoComponent,
    ChangePasswordComponent
  ],
  providers: [
    UserService,
    ErrorHandlerService,
    ChangePasswordService
  ],
  exports: [
    BasicInfoComponent,
    ChangePasswordComponent
  ]
})
export class ProfileModule { }
