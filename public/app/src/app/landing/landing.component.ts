import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { User } from "./landing.model";

import { LandingService } from "./landing.service";


@Component({
  moduleId: module.id,
  selector: "tms-landing",
  templateUrl: "landing.component.html",
  styleUrls: ["landing.component.css"]
})
export class LandingComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;

  isLogin: boolean = true;
  isSignUp: boolean = false;
  
  errorMessage: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private landingService: LandingService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      "email": ["", Validators.required],
      "password": ["", Validators.required]
    });

    this.signupForm = this.fb.group({
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "emailAddress": ["", Validators.required],
      "username": ["", Validators.required],
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

  register(user: User): void {
    console.log(user);
    this.router.navigate(["/dashboard"]);
  }

}
