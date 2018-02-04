
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

import { HomeRouting } from './home-routing.module';


@NgModule({
  imports: [
    HomeRouting
  ],
  declarations: [ HomeComponent ],
  providers: [],
  bootstrap: [ HomeComponent ]
})
export class HomeModule { }
