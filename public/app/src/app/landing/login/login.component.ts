import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "../../../../../../shared/interfaces/-index";

import { LandingService } from "../landing.service";


@Component({
  moduleId    : module.id,
  selector    : "tms-login",
  templateUrl : "login.component.html",
  styleUrls   : ["login.component.css", "../landing.component.css"]
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;
  
  errorMessage: string;
  
  email    = new FormControl("", [ Validators.required ]);
  password = new FormControl("", [ Validators.required ]);
  
  constructor(private router: Router,
              private fb: FormBuilder,
              private landingService: LandingService) { }
  
  ngOnInit() {
    this.buildForm();
  }
  
  buildForm(): void {
    this.form = this.fb.group({
      "email"    : this.email,
      "password" : this.password
    });
  }
  
  login(credential: any): void {
    this.landingService
    .login(credential)
    .subscribe(
      response => this.setAndStoreUser(response),
      err => this.errorMessage = err._body.replace(/['"]+/g, ""));
  }
  
  setAndStoreUser(response: User): void {
    const user = JSON.stringify(response);
  
    localStorage.setItem("user", user);
    this.router.navigate(["/dashboard"]);
  }

}
