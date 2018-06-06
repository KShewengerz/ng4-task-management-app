import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "../landing.model";

import { LandingService } from "../landing.service";


@Component({
  selector: "tms-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["../landing.component.css"]
})
export class SignupComponent implements OnInit {
  
  form: FormGroup;
  
  firstName     = new FormControl("", [ Validators.required ]);
  lastName      = new FormControl("", [ Validators.required ]);
  username      = new FormControl("", [ Validators.required ]);
  password      = new FormControl("", [ Validators.required ]);
  emailAddress  = new FormControl("", [
    Validators.required,
    Validators.pattern("[a-zA-Z0-9.\._-]{1,}.(\\+(.*))?@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")
  ]);
  
  constructor(private router: Router,
              private fb: FormBuilder,
              private landingService: LandingService) {}
  
  ngOnInit() {
    this.buildForm();
  }
  
  buildForm(): void {
    this.form = this.fb.group({
      "firstName"    : this.firstName,
      "lastName"     : this.lastName,
      "emailAddress" : this.emailAddress,
      "username"     : this.username,
      "password"     : this.password
    });
  }
  
  register(user: User): void {
    console.log(user);
  }

}
