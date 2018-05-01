import { Error } from "./error";

export class ErrorHandler {
  
  fieldNames: string[] = [];
  computedFieldNames: any[] = [];
  
  /**
   * @description Filter all existing fields by table record. if 1 - record exists. 0 no record exists.
   *
   * @param {any[]} fields = TableName fields used for counting existing record.
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
  async getErrorMessages(): Promise<string[]> {
    const validateFields = this.fieldNames.length > 1 ? this.fieldNames : this.computedFieldNames;
    const errors = await validateFields.map(field => {
      const key = Object.keys(field)[0];
      const value = field[key];
    
      return this.errorMessage(key)[value];
    });
    
    return errors;
  }
  
  
  /**
   * @description Reserved Error Messages.
   *
   * @param {string} fieldName
   *
   * @returns {Error}
   */
  private errorMessage(fieldName: string): Error {
    return {
      duplicate: {
        code: 409,
        message: `${fieldName} already exists`
      },
      notFound: {
        code: 404,
        message: `${fieldName} not found`
      }
    };
  }
}