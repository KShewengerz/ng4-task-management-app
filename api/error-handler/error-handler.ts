import { Error } from "./error";

export class ErrorHandler {
  
  fieldNames: string[] = [];
  
  filterExistingFields(data: any[]): any {
    this.fieldNames = data
    .map(field => field[0])
    .filter(field => {
      const key = Object.keys(field)[0];
      return field[key] === 1;
    })
    .map(field => Object.keys(field)[0]);
  }
  
  getErrorMessages(action: string): string[] {
    const errors = this.fieldNames.map(key => this.errorMessage(key)[action]);
    return errors;
  }
  
  errorMessage(fieldName?: string): Error {
    return {
      duplicate: `${fieldName} already exists`,
      notFound: "Record not found"
    };
  }
}