import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { AppRouting } from "./app-routing.module";


@NgModule({
  imports: [
    BrowserModule,
    AppRouting
  ],
  declarations: [ AppComponent ],
  providers: [{ provide: "API_URL", useValue: "http://localhost:3000" }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
