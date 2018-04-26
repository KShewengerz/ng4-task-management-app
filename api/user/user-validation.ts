"use strict";

import * as snakeCase from "snakecase-keys";
import * as dbConnection from "../../config/db";

import { Table, UserFields, User } from "../../shared/index";

const db = dbConnection.default;
const userTable = Table.User;


export function getPostValidation(data: User): any[] {
  const {id, username, email_address} = snakeCase(data);
  
  const isIdExists = db(userTable)
  .where({id})
  .count({id: UserFields.Id});
  
  const isUsernameExists = db(userTable)
  .where({username})
  .count({username: UserFields.Username});
  
  const isEmailAddressExists = db(userTable)
  .where({email_address})
  .count({email_address: UserFields.EmailAddress});
  
  const validations = [
    isIdExists,
    isUsernameExists,
    isEmailAddressExists
  ];
  
  return validations;
}

export function getPutValidation(data: User): any[] {
  const {id, username, email_address} = snakeCase(data);
  
  const isUsernameExists = db(userTable)
  .whereNot({id})
  .andWhere({username})
  .count({username: UserFields.Username});
  
  const isEmailAddressExists = db(userTable)
  .whereNot({id})
  .andWhere({email_address})
  .count({email_address: UserFields.EmailAddress});
  
  const validations = [
    isUsernameExists,
    isEmailAddressExists
  ];
  
  return validations;
}