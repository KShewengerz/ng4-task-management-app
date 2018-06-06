import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { User } from "../landing.model";

import { LandingService } from "../landing.service";


@Component({
  selector: "tms-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["../landing.component.css"]
})
export class SignupComponent implements OnInit {
  
  form: FormGroup;
  
  constructor(private router: Router,
              private fb: FormBuilder,
              private landingService: LandingService) {
  }
  
  ngOnInit() {
    this.buildForm();
  }
  
  buildForm(): void {
    this.form = this.fb.group({
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "emailAddress": ["", Validators.required],
      "username": ["", Validators.required],
      "password": ["", Validators.required]
    });
  }
  
  register(user: User): void {
    console.log(user);
  }

}
