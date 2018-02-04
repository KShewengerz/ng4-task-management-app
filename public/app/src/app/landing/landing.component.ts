
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from './landing.model';


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

  constructor(private router: Router,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      'firstName'   : ['', Validators.required],
      'lastName'    : ['', Validators.required],
      'emailAddress': ['', Validators.required],
      'username'    : ['', Validators.required],
      'password'    : ['', Validators.required]
    });
  }

  login(user: User): void {
    console.log(user);
    this.router.navigate(['/dashboard']);
  }

  register(user: User): void {
    console.log(user);
    this.router.navigate(['/dashboard']);
  }

}
