import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { LandingService } from "../landing.service";

import { User } from "../landing.model";


@Component({
  selector: "tms-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../landing.component.css"]
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;
  
  errorMessage: string;
  
  constructor(private router: Router,
              private fb: FormBuilder,
              private landingService: LandingService) { }
  
  ngOnInit() {
    this.buildForm();
  }
  
  buildForm(): void {
    this.form = this.fb.group({
      "email": ["", Validators.required],
      "password": ["", Validators.required]
    });
  }
  
  login(credential: User): void {
    this.landingService
    .login(credential)
    .subscribe(
      response => {
        const user = JSON.stringify(response);

        localStorage.setItem("user", user);
        this.router.navigate(["/dashboard"]);
      },
      err => this.errorMessage = err._body.replace(/['"]+/g, ""));
  }

}
