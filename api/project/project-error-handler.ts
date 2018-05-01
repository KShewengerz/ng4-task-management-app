import { Response } from "express";

import { ErrorType, ErrorHandler } from "../error-handler/index";


/**
 * @description Project HTTP POST Error Handler
 *
 * @param condition
 * @param {e.Response} res
 *
 * @returns {Promise<void>}
 */
export async function postErrorHandler(condition: any, res: Response): Promise<void> {
  const errorHandler = new ErrorHandler();
  
  if (condition.isProjectExists) errorHandler.computedFieldNames.push({id: ErrorType.Duplicate});
  if (condition.isProjectNameExists) errorHandler.computedFieldNames.push({name: ErrorType.Duplicate});
  if (condition.isProjectColorExists) errorHandler.computedFieldNames.push({color: ErrorType.Duplicate});
  else return;
  
  await errorHandler.errorResponseMessageHandler(errorHandler, res, 400);
}


/**
 * @description Project HTTP PUT Error Handler
 *
 * @param condition
 * @param {e.Response} res
 *
 * @returns {Promise<void>}
 */
export async function putErrorHandler(condition: any, res: Response): Promise<void> {
  const errorHandler = new ErrorHandler();
  
  if (!condition.isProjectExists) {
    errorHandler.computedFieldNames.push({id: ErrorType.NotFound});
    await errorHandler.errorResponseMessageHandler(errorHandler, res, 404);
  }
  else if (condition.isProjectNameExists || condition.isProjectColorExists) {
    if (condition.isProjectNameExists) errorHandler.computedFieldNames.push({name: ErrorType.Duplicate});
    if (condition.isProjectColorExists) errorHandler.computedFieldNames.push({color: ErrorType.Duplicate});
  }
  else return;
  
  await errorHandler.errorResponseMessageHandler(errorHandler, res, 400);
}


/**
 * @description Project HTTP GET and DELETE Error Handler
 *
 * @param {e.Response} res
 *
 * @returns {Promise<any>}
 */
export async function getAndDeleteErrorHandler(condition: any, res: Response): Promise<any> {
  const errorHandler = new ErrorHandler();
  
  if (condition.isRecordExists) errorHandler.computedFieldNames.push({ project: ErrorType.NotFound });
  else return;
  
  await errorHandler.errorResponseMessageHandler(errorHandler, res, 404);
}