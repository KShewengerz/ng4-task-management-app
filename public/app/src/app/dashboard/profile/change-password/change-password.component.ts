import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { ErrorHandlerService } from "../../../shared/services/error-handler.service";
import { ChangePasswordService } from "./change-password.service";

import { User } from "../../../../../../../shared/interfaces/-index";


@Component({
  moduleId    : module.id,
  selector    : "tms-change-password",
  templateUrl : "change-password.component.html",
  styleUrls   : ["../profile.component.css", "../../../landing/signup/signup.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  
  @Input() user: User;
  
  form: FormGroup;
  
  currentPassword  = new FormControl("", [ Validators.required, Validators.minLength(5) ]);
  confirmPassword  = new FormControl("", [ Validators.required, Validators.minLength(5) ]);
  newPassword      = new FormControl("", [ Validators.required, Validators.minLength(5) ]);
  
  isSuccessful: boolean = false;
  
  constructor(private fb: FormBuilder,
              private changePasswordService: ChangePasswordService,
              private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.buildForm();
  }
  
  buildForm(): void {
    this.form = this.fb.group({
      "currentPassword" : this.currentPassword,
      "confirmPassword" : this.confirmPassword,
      "newPassword"     : this.newPassword
    });
  }
  
  checkFieldValueValidity(fieldName: string, field: FormControl): void {
    if (field.value === "") field.setErrors({ "required": `${fieldName} is required` });
    else if (field.errors && field.errors["minlength"]) field.setErrors({ "invalidPattern": `${fieldName} must be at least 5 characters`});
    else if (fieldName === "Current Password") this.validateCurrentPassword(field.value);
    else if (fieldName === "New Password") this.validateNewPassword(field.value);
  }
  
  validateCurrentPassword(password: string): void {
    this.changePasswordService
      .comparePassword(password)
      .subscribe(isIdentical => {
        if (!isIdentical) this.currentPassword.setErrors({ "notEqual": "Current Password is not equal to user's db password" });
      });
  }
  
  validateNewPassword(password: string): void {
    if (password === this.currentPassword.value) {
      this.newPassword.setErrors({ "equal": "Current Password and New Password are the same." });
    }
  }
  
  validatePasswordIdenticality(newPassword: string, confirmPassword: string): void {
    if (newPassword != confirmPassword) {
      this.confirmPassword.setErrors({ "notEqual": "Confirm Password is not equal to New Password" });
    }
    else this.changePassword(newPassword);
  }
  
  changePassword(password: string): void {
    const body = {
      id: this.user.id,
      password
    };
    
    this.changePasswordService
      .changePassword(body)
      .subscribe(response => this.isSuccessful = true);
    
    this.form.reset();
  }

}
