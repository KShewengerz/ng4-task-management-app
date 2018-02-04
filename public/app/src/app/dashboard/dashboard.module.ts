
import { NgModule } from '@angular/core';

import { MdlModule } from '@angular-mdl/core';

import { DashboardComponent } from './dashboard.component';

import { DashboardRouting } from './dashboard-routing.module';


@NgModule({
  imports: [
    MdlModule,
    DashboardRouting
  ],
  declarations: [ DashboardComponent ],
  providers: []
})
export class DashboardModule { }
