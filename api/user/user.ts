"use strict";

import { Request, Response, NextFunction } from "express";
import * as snakeCase from "snakecase-keys";

import * as dbConnection from "../../config/db";

import { userTable, userFields } from "../../shared/constants/db-table-fields/user";
import { User } from "../../shared/interfaces/user";
import { Error } from "../../shared/enums/error";
import { ErrorHandler } from "../error-handler";
import { HttpVerb } from "../../shared/enums/http-verb";
import * as userValidation from "./user-validation";

const db = dbConnection.default;


export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const id = req.params.id;
  const fetchUser = await db(userTable).where({id});
  
  res.json(fetchUser);
}

export async function addUser(req: Request, res: Response, next: NextFunction): Promise<void> {
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

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const id = req.params.id;
  
  const deleteUser = await db(userTable)
  .where({id})
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}

export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const id = req.params.id;
  const body = snakeCase(req.body);
  body.id = id;
  
  await validateRequestBody(body, HttpVerb.PUT, res, id);
  
  if (res.statusCode !== 409) {
    const updateUser = await db(userTable)
    .where({id})
    .update(body)
    .catch(err => err);
    
    res.sendStatus(200);
  }
}

async function validateRequestBody(data: User, httpVerb: string, res: Response, userId?: string): Promise<void> {
  const errorHandler = new ErrorHandler();
  const httpAction = fetchValidationByHttpAction(data, httpVerb);
  
  await Promise.all(httpAction).then(async data => {
    const filterFields = await errorHandler.filterExistingFields(data);
    const errorMessages = await errorHandler.getErrorMessages(Error.Duplicate);
    
    if (errorMessages.length > 0) res.status(409).send({errorMessages});
  })
  .catch(err => err);
}

function fetchValidationByHttpAction(data: User, httpAction: string): any[] {
  if (httpAction === HttpVerb.POST) return userValidation.getPostValidation(data);
  else return userValidation.getPutValidation(data);
}

