
import { NgModule } from '@angular/core';

import { LandingComponent } from './landing.component';

import { LandingRouting } from './landing-routing.module';


@NgModule({
  imports: [
    LandingRouting
  ],
  declarations: [ LandingComponent ],
  providers: [],
  bootstrap: [ LandingComponent ]
})
export class LandingModule { }
