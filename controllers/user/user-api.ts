"use strict";

import { Request, Response, NextFunction } from "express";
import * as snakeCase from "snakecase-keys";
import * as camelCase from "camelcase-keys";
import * as uuid from "uuid/v4";

import { userQuery, userValidation, userErrorHandler } from "./index";

import { ErrorHandler } from "../error-handler/index";
import { Passport } from "../../server";


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
  body.id = uuid();
  
  const condition = await userValidation.getPostValidation(body);
  
  await userErrorHandler.postAndPutErrorHandler(condition, res, true);
  
  if (res.statusCode !== 400) await userQuery.addNewUserQuery(body, res);
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
  
  const condition = await userValidation.getPutValidation(body, id);
  
  await userErrorHandler.postAndPutErrorHandler(condition, res);
  
  if (res.statusCode !== 400) await userQuery.updateUserQuery(id, body, res);
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
  
  if (res.statusCode !== 404) await userQuery.getUserQuery(id, res);
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
  
  if (res.statusCode !== 404) await userQuery.deleteUserQuery(id, res);
}


/**
 * @api {post} /login
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  Passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(404).json(info.message);
    
    req.logIn(user, err => {
      if (err) next(err);
      else {
        const user = camelCase(req.user);
        res.status(200).json(user);
      }
    });
  })(req, res, next);
}
