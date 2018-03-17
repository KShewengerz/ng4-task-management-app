
import { NgModule } from '@angular/core';

import { MdlModule } from '@angular-mdl/core';

import { DashboardComponent } from './dashboard.component';
import { NavigationComponent } from './sections/navigation/navigation.component';
import { UserImageHeaderComponent } from './sections/user-image-header/user-image-header.component';

import { DashboardRouting } from './dashboard-routing.module';


@NgModule({
  imports: [
    MdlModule,
    DashboardRouting
  ],
  declarations: [
    DashboardComponent,
    NavigationComponent,
    UserImageHeaderComponent
  ],
  providers: []
})
export class DashboardModule { }
