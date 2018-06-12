import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "tms-page-not-found",
  templateUrl: "page-not-found.component.html",
  styleUrls: ["page-not-found.component.css", "../landing/landing.component.css"]
})
export class PageNotFoundComponent implements OnInit {

  buttonLabel: string;
  buttonUrl: string;
  
  constructor(private router: Router) { }

  ngOnInit() {
    const session = localStorage.getItem("user");
    
    this.buttonLabel = session ? "Dashboard" : "Login";
    this.buttonUrl = session ? "/dashboard/task" : "/login";
  }

}
