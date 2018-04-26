"use strict";

import { Request, Response, NextFunction } from "express";
import * as snakeCase from "snakecase-keys";
import * as camelCase from "camelcase-keys";

import * as dbConnection from "../../config/db";
import * as userValidation from "./user-validation";

import { ErrorHandler } from "../error-handler";
import { Table, User, Error, HttpVerb } from "../../shared/index";

const db = dbConnection.default;
const userTable = Table.User;

export async function getUser(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const fetchUser = await db(userTable).where({id});
  const result = camelCase(fetchUser);
  
  res.json(<User>result);
}

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

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  
  const deleteUser = await db(userTable)
  .where({id})
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const body = snakeCase(req.body);
  body.id = id;
  
  await validateRequestBody(body, HttpVerb.PUT, res);
  
  if (res.statusCode !== 409) {
    const updateUser = await db(userTable)
    .where({id})
    .update(body)
    .catch(err => err);
    
    res.sendStatus(200);
  }
}

async function validateRequestBody(data: User, httpVerb: string, res: Response): Promise<void> {
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

