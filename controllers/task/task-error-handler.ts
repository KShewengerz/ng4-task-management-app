import { Response } from "express";
import { ErrorHandler, ErrorType } from "../error-handler/-index";


/**
 * @description Task HTTP POST Error Handler
 *
 * @param {Any} condition
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function postErrorHandler(condition: any, res: Response,): Promise<void> {
  const errorHandler = new ErrorHandler();
  
  if (condition.isDescriptionExists) errorHandler.computedFieldNames.push({ description: ErrorType.Duplicate });
  
  const errors = errorHandler.computedFieldNames.length;
  
  if (errors) await errorHandler.errorResponseMessageHandler(errorHandler, res, 400);
}


/**
 * @description Task HTTP PUT Error Handler
 *
 * @param {Any} condition
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function putErrorHandler(condition: any, res: Response,): Promise<void> {
  const errorHandler = new ErrorHandler();
  
  if (condition.isDescriptionExists) errorHandler.computedFieldNames.push({ description: ErrorType.Duplicate });
  if (!condition.isRecordExists) errorHandler.computedFieldNames.push({ task: ErrorType.NotFound });
  
  const errors = errorHandler.computedFieldNames.length;
  
  if (errors) await errorHandler.errorResponseMessageHandler(errorHandler, res, 400);
}


/**
 * @description Task HTTP GET and DELETE Error Handler
 *
 * @param {Any} condition
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function deleteErrorHandler(condition: any, res: Response): Promise<void> {
  const errorHandler = new ErrorHandler();
  
  if (!condition.isRecordExists) errorHandler.computedFieldNames.push({ task: ErrorType.NotFound });
  else return;
  
  await errorHandler.errorResponseMessageHandler(errorHandler, res, 404);
}