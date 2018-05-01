"use strict";

import { Request, Response } from "express";
import * as snakeCase from "snakecase-keys";

import { userQuery, userValidation, userErrorHandler } from "./index";

import { ErrorHandler } from "../error-handler/index";
import { HttpVerb } from "../../shared/enums/index";


/**
 * @api {post} /
 * @description Add new user.
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function addUser(req: Request, res: Response): Promise<void> {
  const body = snakeCase(req.body);
  
  const condition = await userValidation.getPostValidation(body);
  
  await userErrorHandler.postAndPutErrorHandler(condition, res, true);
  
  if (res.statusCode !== 400) await userQuery.addNewUser(body, res);
}


/**
 * @api {put} /:userId
 * @description Update's user information by userId.
 *
 * @apiParam {Uuid} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function updateUser(req: Request, res: Response): Promise<void> {
  const id = req.params.userId;
  const body = snakeCase(req.body);
  
  body.id = id;
  
  const condition = await userValidation.getPutValidation(body);
  
  await userErrorHandler.postAndPutErrorHandler(condition, res);
  
  if (res.statusCode !== 400) await userQuery.updateUser(id, body, res);
}


/**
 * @api {get} /:id
 * @description Get user by userId.
 *
 * @apiParam {Uuid} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function getUser(req: Request, res: Response): Promise<void> {
  const id = req.params.userId;
  
  const condition = await userValidation.checkIfUserExists(id);
  
  await userErrorHandler.getAndDeleteErrorHandler(condition, res);
  
  if (res.statusCode !== 404) await userQuery.getUser(id, res);
}


/**
 * @api {delete} /:userId
 * @description Delete user by userId.
 *
 * @apiParam {Uuid} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function deleteUser(req: Request, res: Response): Promise<void> {
  const errorHandler = new ErrorHandler();
  const id = req.params.userId;
  
  const condition = await userValidation.checkIfUserExists(id);
  
  await userErrorHandler.getAndDeleteErrorHandler(condition, res);
  
  if (res.statusCode !== 404) await userQuery.deleteUser(id, res);
}
