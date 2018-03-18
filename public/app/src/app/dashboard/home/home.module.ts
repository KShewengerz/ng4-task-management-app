
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdlModule } from '@angular-mdl/core';

import { HomeComponent } from './home.component';
import { HeaderComponent } from './sections/header/header.component';
import { TaskListComponent } from './sections/task-list/task-list.component';

import { HomeRouting } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    HomeRouting
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    TaskListComponent
  ],
  providers: []
})
export class HomeModule { }
