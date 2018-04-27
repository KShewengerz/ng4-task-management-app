import { Error } from "./error";

export class ErrorHandler {
  
  fieldNames: string[] = [];
  
  /**
   * @description Filter all existing fields by table record.
   * if 1 - record exists. 0 no record exists.
   *
   * @param {any[]} fields = Table fields used for counting existing record.
   *
   * @returns {void}
   */
  filterExistingFields(fields: any[]): void {
    this.fieldNames = fields[0]
    .filter(field => {
      const key = Object.keys(field)[0];
  
      return field[key] === 1;
    })
    .map(field => Object.keys(field)[0]);
  }
  
  
  /**
   * @description Get Error Message passing its field name and error type.
   *
   * @param {string} errorType
   *
   * @returns {string[]}
   */
  getErrorMessages(errorType: string): string[] {
    const errors = this.fieldNames.map(fieldName => this.errorMessage(fieldName)[errorType]);
    return errors;
  }
  
  
  /**
   * @description Reserved Error Messages.
   *
   * @param {string} fieldName
   *
   * @returns {Error}
   */
  errorMessage(fieldName?: string): Error {
    return {
      duplicate: `${fieldName} already exists`,
      notFound: "Record not found"
    };
  }
}