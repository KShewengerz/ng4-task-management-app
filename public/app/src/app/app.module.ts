import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { MdlModule } from "@angular-mdl/core";

import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { AppRouting } from "./app-routing.module";


@NgModule({
  imports: [
    BrowserModule,
    MdlModule,
    SharedModule,
    AppRouting
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [ { provide: "API_URL", useValue: "http://localhost:3000" }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
