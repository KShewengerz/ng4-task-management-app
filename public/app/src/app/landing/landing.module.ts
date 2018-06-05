import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { MdlModule } from "@angular-mdl/core";

import { LandingComponent } from "./landing.component";
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
    LandingRouting
  ],
  declarations: [ LandingComponent ],
  providers: [LandingService],
  bootstrap: [ LandingComponent ]
})
export class LandingModule { }
