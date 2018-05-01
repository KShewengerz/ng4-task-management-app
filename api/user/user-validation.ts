"use strict";

import * as snakeCase from "snakecase-keys";
import * as dbConnection from "../../config/db";

import { TableName, UserField } from "../../shared/enums/index";
import { User } from "../../shared/interfaces/index";

const db = dbConnection.default;
const userTable = TableName.User;


/**
 * @description Post Validation - checking if id, username and email already exists.
 *
 * @param {User} user
 *
 * @returns {any[]}
 */
export function getPostValidation(user: User): any[] {
  const {id, username, email_address} = snakeCase(user);
  
  const isIdExists = db(userTable)
  .where({id})
  .count({id: UserField.Id});
  
  const isUsernameExists = db(userTable)
  .where({username})
  .count({username: UserField.Username});
  
  const isEmailAddressExists = db(userTable)
  .where({email_address})
  .count({email_address: UserField.EmailAddress});
  
  const validations = [
    isIdExists,
    isUsernameExists,
    isEmailAddressExists
  ];
  
  return validations;
}


/**
 * @description Put Validation - checking if username and email address already exists
 * with other users on user records.
 *
 * @param {User} user
 *
 * @returns {any[]}
 */
export function getPutValidation(user: User): any[] {
  const {id, username, email_address} = snakeCase(user);
  
  const isUsernameExists = db(userTable)
  .whereNot({id})
  .andWhere({username})
  .count({username: UserField.Username});
  
  const isEmailAddressExists = db(userTable)
  .whereNot({id})
  .andWhere({email_address})
  .count({email_address: UserField.EmailAddress});
  
  const validations = [
    isUsernameExists,
    isEmailAddressExists
  ];
  
  return validations;
}


/**
 * @description Checking if user record already exists.
 *
 * @param {string} id
 *
 * @returns {Promise<number>}
 */
export async function checkIfUserExists(id: string): Promise<number> {
  const isRecordExists = await db(userTable)
  .where({id})
  .count({id: UserField.Id})
  .then(response => {
    const isExists = response[0][UserField.Id];
    return isExists;
  });
  
  return isRecordExists;
}