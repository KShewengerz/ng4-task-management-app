import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { FormControl } from "@angular/forms";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";


@Injectable()
export class ErrorHandlerService {

  constructor() { }
  
  checkFieldValueValidity(fieldName: string, field: FormControl, data: any, isUniqueRequired?: boolean): void {
    const isValueExists = data.filter(user => user[fieldName] === field.value).length;
    
    fieldName = fieldName.split(/(?=[A-Z])/).map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
    
    if ((field.value === "" || field.value == null)
         && (field.errors && field.errors["required"])) field.setErrors({"requiredField": `${fieldName} is required`});
    
    else if (field.errors && field.errors["minlength"]) field.setErrors({"minLength": `${fieldName} must be at least 5 characters`});
    
    else if (isValueExists && isUniqueRequired) field.setErrors({"notUnique": `${fieldName} already exists`});
    
    else if (field.errors && field.errors["pattern"]) {
      if (fieldName === "Email Address") field.setErrors({"invalidPattern": "Invalid Email Address"});
      else field.setErrors({"invalidPattern": "Invalid Pattern"});
    }
  }
  
  catchError(err: Error): any {
    let errMessage: string;
    let errorResponse: any;
    
    if (err instanceof Response) {
      const body   = err.json() || "";
      const error  = body.error || JSON.stringify(body);
      
      errorResponse = body;
      
      errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
      
    } else {
      errMessage = err.message ? err.message : err.toString();
      errorResponse = errMessage;
    }
    
    return Observable.throw(errMessage);
  }

}
