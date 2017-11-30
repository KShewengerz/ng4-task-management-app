
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Credential } from './landing.model';


@Component({
  moduleId: module.id,
  selector: 'tms-landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['landing.component.css']
})
export class LandingComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;

  isLogin: boolean = true;
  isSignUp: boolean = false;

  firstName    = new FormControl('', Validators.required);
  lastName     = new FormControl('', Validators.required);
  emailAddress = new FormControl('', Validators.required);
  username     = new FormControl('', Validators.required);
  password     = new FormControl('', Validators.required);

  constructor(private router: Router,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'username':   this.username,
      'password':   this.password
    });

    this.signupForm = this.fb.group({
      'firstName'   : this.firstName,
      'lastName'    : this.lastName,
      'emailAddress': this.emailAddress,
      'username'    : this.username,
      'password'    : this.password
    });
  }

  login(user: Credential) {
    console.log(user);
  }

}
