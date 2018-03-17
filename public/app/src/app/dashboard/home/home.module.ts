
import { NgModule } from '@angular/core';

import { MdlModule } from '@angular-mdl/core';

import { HomeComponent } from './home.component';

import { HomeRouting } from './home-routing.module';


@NgModule({
  imports: [
    MdlModule,
    HomeRouting
  ],
  declarations: [ HomeComponent ],
  providers: [],
  bootstrap: [ HomeComponent ]
})
export class HomeModule { }
