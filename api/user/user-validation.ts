"use strict";

import * as snakeCase from "snakecase-keys";
import * as dbConnection from "../../config/db";

import { User } from "../../shared/interfaces/user";
import { userFields, userTable } from "../../shared/constants/db-table-fields/user";

const db = dbConnection.default;


export function getPostValidation(data: User): any[] {
  const {id, username, email_address} = snakeCase(data);
  
  const isIdExists = db(userTable)
  .where({id})
  .count({id: userFields.Id});
  
  const isUsernameExists = db(userTable)
  .where({username})
  .count({username: userFields.Username});
  
  const isEmailAddressExists = db(userTable)
  .where({email_address})
  .count({email_address: userFields.EmailAddress});
  
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
  .count({username: userFields.Username});
  
  const isEmailAddressExists = db(userTable)
  .whereNot({id})
  .andWhere({email_address})
  .count({email_address: userFields.EmailAddress});
  
  const validations = [
    isUsernameExists,
    isEmailAddressExists
  ];
  
  return validations;
}