import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { UserService } from "../../../shared/user/user.service";
import { ErrorHandlerService } from "../../../shared/services/error-handler.service";

import { Gender } from "../../../../../../../shared/enums/-index";
import { User } from "../../../../../../../shared/interfaces/-index";


@Component({
  moduleId    : module.id,
  selector    : "tms-basic-info",
  templateUrl : "basic-info.component.html",
  styleUrls   : ["../profile.component.css", "../../../landing/signup/signup.component.css"]
})
export class BasicInfoComponent implements OnInit {
  
  @Input() users: User[] = [];
  
  form: FormGroup;
  
  genderSelection = ["Male", "Female"];
  Gender: typeof Gender = Gender;
  
  isBasic: boolean = true;
  isSuccessful: boolean = false;
  
  user: User;
  
  firstName       = new FormControl("", [ Validators.required, Validators.pattern("^[a-zA-Z].+\s?.") ]);
  lastName        = new FormControl("", [ Validators.required, Validators.pattern("^[a-zA-Z].+\s?.") ]);
  username        = new FormControl("", [ Validators.required, Validators.minLength(5) ]);
  gender          = new FormControl("", [ Validators.required ]);
  emailAddress    = new FormControl("", [
    Validators.required,
    Validators.pattern("[a-zA-Z0-9.\._-]{1,}.(\\+(.*))?@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")
  ]);
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private userService: UserService,
              private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit() {
    const userSession = sessionStorage.getItem("user");
    
    this.user = JSON.parse(userSession);
    
    this.buildForm();
  }
  
  buildForm(): void {
    this.form = this.fb.group({
      "firstName"       : this.firstName,
      "lastName"        : this.lastName,
      "emailAddress"    : this.emailAddress,
      "username"        : this.username,
      "gender"          : this.gender,
    });
    
    this.initializeFormValues();
  }
  
  initializeFormValues(): void {
    this.form.patchValue({
      "firstName"    : this.user.firstName,
      "lastName"     : this.user.lastName,
      "emailAddress" : this.user.emailAddress,
      "username"     : this.user.username,
      "gender"       : this.user.gender
    });
  }
  
  checkFieldValueValidity(fieldName: string, field: FormControl, isUniqueRequired: boolean = false): void {
    this.errorHandlerService.checkFieldValueValidity(fieldName, field, this.users, isUniqueRequired);
  }
  
  update(user: User): void {
    if (user.emailAddress === this.user.emailAddress) delete user.emailAddress;
    if (user.username === this.user.username) delete user.username;
    
    this.userService
      .updateUser(user)
      .subscribe(
        response => this.saveNewUserSession(user),
        err => console.error(err)
      );
  }
  
  async saveNewUserSession(user: User): Promise<void> {
    this.userService
      .fetchUser(this.user.id)
      .subscribe(response => {
        const transformUser = JSON.stringify(response[0]);
  
        this.isSuccessful = true;
  
        sessionStorage.removeItem("user");
        sessionStorage.setItem("user", transformUser);
      });
  }
  
}
