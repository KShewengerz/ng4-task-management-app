import { Response } from "express";
import { ErrorHandler, ErrorType } from "../error-handler";


/**
 * @description User HTTP POST and PUT Error Handler
 *
 * @param {Any} condition
 * @param {Response} res
 * @param {Boolean} isPost
 *
 * @returns {Promise<void>}
 */
export async function postAndPutErrorHandler(condition: any, res: Response, isPost?: boolean): Promise<void> {
  const errorHandler = new ErrorHandler();
  
  if (condition.isIdExists && isPost) errorHandler.computedFieldNames.push({ id: ErrorType.Duplicate });
  if (condition.isEmailAddressExists) errorHandler.computedFieldNames.push({ email: ErrorType.Duplicate });
  if (condition.isUsernameExists) errorHandler.computedFieldNames.push({ username: ErrorType.Duplicate });
  else return;
  
  
  await errorHandler.errorResponseMessageHandler(errorHandler, res, 400);
}


/**
 * @description Project HTTP GET and DELETE Error Handler
 *
 * @param {Any} condition
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function getAndDeleteErrorHandler(condition: any, res: Response): Promise<void> {
  const errorHandler = new ErrorHandler();
  
  if (!condition.isRecordExists) errorHandler.computedFieldNames.push({ user: ErrorType.NotFound });
  else return;
  
  await errorHandler.errorResponseMessageHandler(errorHandler, res, 404);
}