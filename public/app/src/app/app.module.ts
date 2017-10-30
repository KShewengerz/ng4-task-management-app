
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MdlModule } from '@angular-mdl/core';

import { AppComponent } from './app.component';

import { AppRouting } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    MdlModule,
    AppRouting
  ],
  declarations: [ AppComponent ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
