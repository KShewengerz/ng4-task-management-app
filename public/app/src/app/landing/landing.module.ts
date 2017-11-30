
import { NgModule } from '@angular/core';

import { MdlModule } from '@angular-mdl/core';

import { LandingComponent } from './landing.component';

import { LandingRouting } from './landing-routing.module';


@NgModule({
  imports: [
    MdlModule,
    LandingRouting
  ],
  declarations: [ LandingComponent ],
  providers: [],
  bootstrap: [ LandingComponent ]
})
export class LandingModule { }
