"use strict";

import { Request, Response, NextFunction } from "express";
import * as snakeCase from "snakecase-keys";
import * as camelCase from "camelcase-keys";

import * as dbConnection from "../../config/db";
import * as userValidation from "./user-validation";

import { ErrorHandler } from "../error-handler/error-handler";
import { Table, User, Error, HttpVerb } from "../../shared/index";

const db = dbConnection.default;
const userTable = Table.User;


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
  
  await validateRequestBody(body, HttpVerb.POST, res);
  
  if (res.statusCode !== 409) {
    const insertUser = await db(userTable)
    .insert(body)
    .then(rows => rows[0])
    .catch(err => err);
    
    res.sendStatus(201).send();
  }
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
  const errorHandler = new ErrorHandler();
  const id = req.params.userId;
  const body = snakeCase(req.body);
  
  body.id = id;
  
  const isUserExists = await userValidation.checkIfUserRecordExists(id);
  
  if (isUserExists) {
    await validateRequestBody(body, HttpVerb.PUT, res);
    
    if (res.statusCode !== 409) {
      const updateUser = await db(userTable)
      .where({id})
      .update(body)
      .catch(err => err);
      
      res.sendStatus(200);
    }
  }
  else {
    const recordNotFound = errorHandler.errorMessage().notFound;
    res.status(404).send(recordNotFound);
  }
  
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
  const fetchUser = await db(userTable).where({id});
  const result = camelCase(fetchUser);
  
  res.json(<User>result);
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
  
  const isUserExists = await userValidation.checkIfUserRecordExists(id);
  
  if (isUserExists) {
    const deleteUser = await db(userTable)
    .where({id})
    .del()
    .catch(err => err);
    
    res.sendStatus(204);
  }
  else {
    const userNotFound = errorHandler.errorMessage().notFound;
    res.status(404).send(userNotFound);
  }
}


/**
 * @description User request body field validation.
 *
 * @param {User} data
 * @param {String} httpVerb
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
async function validateRequestBody(data: User, httpVerb: string, res: Response): Promise<void> {
  const errorHandler = new ErrorHandler();
  const validation = fetchValidationByHttpVerb(data, httpVerb);
  
  await Promise.all(validation).then(async data => {
    const filterFields = await errorHandler.filterExistingFields(data);
    const errorMessages = await errorHandler.getErrorMessages(Error.Duplicate);
    
    if (errorMessages.length > 0) res.status(409).send({errorMessages});
  })
  .catch(err => err);
}


/**
 * @description Fetch Validation by Http Verb.
 *
 * @param {User} data
 * @param {string} httpVerb
 *
 * @returns {any[]}
 */
function fetchValidationByHttpVerb(data: User, httpVerb: string): any[] {
  if (httpVerb === HttpVerb.POST) return userValidation.getPostValidation(data);
  else return userValidation.getPutValidation(data);
}

