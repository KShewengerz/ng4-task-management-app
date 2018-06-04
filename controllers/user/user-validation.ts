"use strict";

import * as snakeCase from "snakecase-keys";
import * as dbConnection from "../../config/db";

import { TableName, UserField } from "../../shared/enums/index";
import { User } from "../../shared/interfaces/index";

const db = dbConnection.default;
const { User: userTable } = TableName;


/**
 * @description Post Validation - checking if id, username and email already exists.
 *
 * @param {User} user
 *
 * @returns {any[]}
 */
export async function getPostValidation(user: User): Promise<any> {
  const { id, username, email_address } = snakeCase(user);
  
  const isIdExists = await db(userTable)
  .count({ id: UserField.Id })
  .where({ id })
  .then(response => response[0].id)
  .catch(err => err);
  
  const isUsernameExists = await db(userTable)
  .count({ username: UserField.Username })
  .where({ username })
  .then(response => response[0].username)
  .catch(err => err);
  
  
  const isEmailAddressExists = await db(userTable)
  .count({ email_address: UserField.EmailAddress })
  .where({ email_address })
  .then(response => response[0].email_address)
  .catch(err => err);
  
  return { isIdExists, isUsernameExists, isEmailAddressExists };
}


/**
 * @description Put Validation - checking if username and email address already exists
 * with other users on user records.
 *
 * @param {String} id
 * @param {User} user
 *
 * @returns {any[]}
 */
export async function getPutValidation(user: User, id: string): Promise<any> {
  const { username, email_address } = snakeCase(user);
  
  const isUsernameExists = await db(userTable)
  .count({ username: UserField.Username })
  .whereNot({ id })
  .andWhere({ username })
  .then(response => response[0].username)
  .catch(err => err);
  
  
  const isEmailAddressExists = await db(userTable)
  .count({ email_address: UserField.EmailAddress })
  .whereNot({ id })
  .andWhere({ email_address })
  .then(response => response[0].email_address)
  .catch(err => err);
  
  
  return { isUsernameExists, isEmailAddressExists };
}


/**
 * @description Checking if user record already exists.
 *
 * @param {string} id
 *
 * @returns {Promise<number>}
 */
export async function checkIfUserExists(id: string): Promise<any> {
  const isRecordExists = await db(userTable)
  .count({ id: UserField.Id })
  .where({ id })
  .then(response => response[0].id)
  .catch(err => err);
  
  return { isRecordExists };
}