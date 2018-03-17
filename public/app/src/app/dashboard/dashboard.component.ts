
import { Component } from '@angular/core';

import { NavigationComponent } from './sections/navigation/navigation.component';
import { UserImageHeaderComponent } from './sections/user-image-header/user-image-header.component';


@Component({
  moduleId: module.id,
  selector: 'tms-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  entryComponents: [
    NavigationComponent,
    UserImageHeaderComponent
  ]
})
export class DashboardComponent {

  constructor() {}

}
