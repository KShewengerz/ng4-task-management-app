import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { MdlModule } from "@angular-mdl/core";
import { MdlPopoverModule } from "@angular-mdl/popover";
import { MdlSelectModule } from "@angular-mdl/select";

import { LandingComponent } from "./landing.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { FeatureComponent } from "./sections/feature/feature.component";

import { LandingService } from "./landing.service";

import { LandingRouting } from "./landing-routing.module";


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    MdlPopoverModule,
    MdlSelectModule,
    LandingRouting
  ],
  declarations: [
    LandingComponent,
    LoginComponent,
    SignupComponent,
    FeatureComponent
  ],
  providers: [ LandingService ],
  bootstrap: [ LandingComponent ]
})
export class LandingModule { }
