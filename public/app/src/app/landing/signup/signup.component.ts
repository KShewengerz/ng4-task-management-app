import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { UserService } from "../../shared/user/user.service";
import { ErrorHandlerService } from "../../shared/services/error-handler.service";

import { Gender } from "../../../../../../shared/enums";
import { User } from "../../../../../../shared/interfaces";


@Component({
  moduleId: module.id,
  selector: "tms-signup",
  templateUrl: "signup.component.html",
  styleUrls: ["signup.component.css", "../landing.component.css"]
})
export class SignupComponent implements OnInit {
  
  form: FormGroup;
  
  genderSelection = ["Male", "Female"];
  Gender: typeof Gender = Gender;
  
  users: User[] = [];
  isSuccessful: boolean = false;
  
  firstName     = new FormControl("", [ Validators.required, Validators.pattern("^[a-zA-Z].+\s?.") ]);
  lastName      = new FormControl("", [ Validators.required, Validators.pattern("^[a-zA-Z].+\s?.") ]);
  username      = new FormControl("", [ Validators.required, Validators.minLength(5) ]);
  password      = new FormControl("", [ Validators.required, Validators.minLength(5) ]);
  gender        = new FormControl("", [ Validators.required ]);
  emailAddress  = new FormControl("", [
    Validators.required,
    Validators.pattern("[a-zA-Z0-9.\._-]{1,}.(\\+(.*))?@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")
  ]);
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private userService: UserService,
              private errorHandlerService: ErrorHandlerService) {}
              
  ngOnInit() {
    this.users = this.route.snapshot.data.users;
    this.buildForm();
  }
  
  buildForm(): void {
    this.form = this.fb.group({
      "firstName"    : this.firstName,
      "lastName"     : this.lastName,
      "emailAddress" : this.emailAddress,
      "username"     : this.username,
      "password"     : this.password,
      "gender"       : this.gender
    });
  }
  
  checkFieldValueValidity(fieldName: string, field: FormControl, isUniqueRequired: boolean = false): void {
    this.errorHandlerService.checkFieldValueValidity(fieldName, field, this.users, isUniqueRequired);
  }
  
  register(user: User): void {
    this.userService
    .saveNewUser(user)
      .subscribe(
        response => this.isSuccessful = true,
        err => console.error(err),
        () => this.form.reset()
      );
  }

}
