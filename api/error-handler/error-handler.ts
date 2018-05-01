import { Error } from "./error";
import { Response } from "express";

export class ErrorHandler {
  
  computedFieldNames: any[] = [];
  
  /**
   * @description Get Error Message passing its field name and error type.
   *
   * @param {string} errorType
   *
   * @returns {string[]}
   */
  async getErrorMessages(): Promise<string[]> {
    const errors = await this.computedFieldNames.map(field => {
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
  
  /**
   * @description Handles API error message response.
   *
   * @param {ErrorHandler} errorHandler
   * @param {Response} res
   * @param {number} statusCode
   *
   * @returns {Promise<void>}
   */
  async errorResponseMessageHandler(errorHandler: ErrorHandler, res: Response, statusCode?: number): Promise<void> {
    const errorMessages = await errorHandler.getErrorMessages();
    const code = statusCode ? statusCode : 400;
    
    res.status(code).send({ errorMessages });
  }
}