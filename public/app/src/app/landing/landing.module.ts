
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdlModule } from '@angular-mdl/core';

import { LandingComponent } from './landing.component';

import { LandingRouting } from './landing-routing.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    LandingRouting
  ],
  declarations: [ LandingComponent ],
  providers: [],
  bootstrap: [ LandingComponent ]
})
export class LandingModule { }
