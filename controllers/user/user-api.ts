"use strict";

import { Request, Response, NextFunction } from "express";
import * as uuid from "uuid/v4";
import * as bcrypt from "bcrypt";

import { userQuery, userValidation, userErrorHandler } from "./-index";

import { Passport } from "../../server";
import * as session from "../session";

const snakeCase = require("snakecase-keys");
const camelCase = require("camelcase-keys");


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
  body.password = await bcrypt.hashSync(body.password, bcrypt.genSaltSync(8));
  
  const condition = await userValidation.getPostValidation(body);
  
  await userErrorHandler.postAndPutErrorHandler(condition, res, true);
  
  if (res.statusCode !== 400) await userQuery.addNewUserQuery(body, res);
}


/**
 * @api {put} /
 * @description Update current user information.
 *
 * @apiParam {Uuid} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function updateUser(req: any, res: Response): Promise<void> {
  const id = await session.getSessionUserId(req.sessionID);
  
  const body = snakeCase(req.body);
  
  const condition = await userValidation.getPutValidation(body, id);

  await userErrorHandler.postAndPutErrorHandler(condition, res);

  if (res.statusCode !== 400) await userQuery.updateUserQuery(id, body, res);
}


/**
 * @api {get} /
 * @description Get all users.
 *
 * @apiParam {Uuid} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function getAllUsers(req: any, res: Response): Promise<void> {
  await userQuery.getAllUserQuery(res);
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
export async function login(req: any, res: Response, next: NextFunction): Promise<void> {
  Passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(404).json(info.message);
    
    const transformUserCase = camelCase(user);
    const sessionBody = { sessionId: req.sessionID, userId: user.id };
    
    await session.saveSession(sessionBody);
    
    res.status(200).json(transformUserCase);
  })(req, res, next);
}


/**
 * @api {get} /logout
 *
 * @param {Any} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function logout(req: any, res: Response, next: NextFunction): Promise<void> {
  const id = await session.getLastActiveSession();
  
  await session.removeUserSession(id);

  req.logOut();
  req.session.destroy();

  res.sendStatus(200);
}


/**
 * @api {get} /compare-password/:password
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function comparePassword(req: any, res: Response, next: NextFunction): Promise<void> {
  const password = req.params.password;
  const id       = await session.getSessionUserId(req.sessionID);
  
  await userQuery.getUserHashedPassword(id, password, res);
}


/**
 * @api {put} /change-password
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  const body = req.body;
  
  await userQuery.changeUserPassword(body, res);
}
