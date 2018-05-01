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
  
  await errorResponseMessageHandler(errorHandler, res, 400);
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
    await errorResponseMessageHandler(errorHandler, res, 404);
  }
  else {
    if (condition.isProjectNameExists) errorHandler.computedFieldNames.push({name: ErrorType.Duplicate});
    if (condition.isProjectColorExists) errorHandler.computedFieldNames.push({color: ErrorType.Duplicate});
  }
  
  await errorResponseMessageHandler(errorHandler, res, 400);
}


/**
 * @description Project HTTP GET and DELETE Error Handler
 *
 * @param {e.Response} res
 *
 * @returns {Promise<any>}
 */
export async function getAndDeleteErrorHandler(res: Response): Promise<any> {
  const errorHandler = new ErrorHandler();
  
  errorHandler.computedFieldNames.push({project: ErrorType.NotFound});
  await errorResponseMessageHandler(errorHandler, res);
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
export async function errorResponseMessageHandler(errorHandler: ErrorHandler, res: Response, statusCode?: number): Promise<void> {
  const errorMessages = await errorHandler.getErrorMessages();
  const code = statusCode ? statusCode : 400;
  
  res.status(code).send({errorMessages});
}