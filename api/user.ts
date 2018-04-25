"use strict";

import { Router, Request, Response, NextFunction } from "express";

import * as dbConnection from "../config/db";

import { userTable, userFields } from "../shared/constants/db-table-fields/user";
import { User } from "../shared/interfaces/user";
import { Error } from "../shared/enums/error";
import { ErrorHandler } from "../shared/constants/error-message";

const db = dbConnection.default;


export async function getUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const fetchUser = await db(userTable).where({id});
  
  res.json(fetchUser);
}

export async function addUser(req: Request, res: Response, next: NextFunction) {
  await userValidation(req.body);
  
  if (res.statusCode !== 404) {
    const insertUser = await db(userTable)
    .insert(req.body)
    .then(rows => rows[0])
    .catch(err => err);
    
    res.json(insertUser);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  
  const deleteUser = await db(userTable)
  .where({id})
  .del()
  .catch(err => err);
  
  res.json(deleteUser);
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const body = req.body;
  
  //TODO: Block update if id, username and emailAddress already exist with other users
  
  const updateUser = await db(userTable)
  .where({id})
  .update(body)
  .catch(err => err);
  
  res.json(updateUser);
}

async function userValidation(data: User, res?: Response) {
  const errorHandler = new ErrorHandler();
  const {id, emailAddress, username} = data;
  
  const isIdExists = db(userTable)
  .count({id: userFields.Id})
  .where({id});
  
  const isUsernameExists = db(userTable)
  .count({username: userFields.Username})
  .where({[userFields.Username]: username});
  
  const isEmailAddressExists = db(userTable)
  .count({email_address: userFields.EmailAddress})
  .where({[userFields.EmailAddress]: emailAddress});
  
  const result = await Promise.all([
    isIdExists,
    isUsernameExists,
    isEmailAddressExists
  ]).then(async data => {
    const filterFields = await errorHandler.filterExistingFields(data);
    const errorMessages = await errorHandler.getErrorMessages(Error.Duplicate);
    
    if (errorMessages.length > 0) res.status(404).send({errorMessages});
  })
  .catch(err => err);
}