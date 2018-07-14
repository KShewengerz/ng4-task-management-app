"use strict";

import * as dbConnection from "../../config/db";

import { UserFields } from "../../shared/enums/-index";
import { User } from "../../shared/interfaces/-index";

const snakeCase = require("snakecase-keys");

const db = dbConnection.default;


/**
 * @description Post Validation - checking if id, username and email already exists.
 *
 * @param {User} user
 *
 * @returns {any[]}
 */
export async function getPostValidation(user: User): Promise<any> {
  const { id, username, email_address } = snakeCase(user);
  
  const isIdExists = await db(UserFields.Table)
  .count({ id: UserFields.Id })
  .where({ id })
  .then(response => response[0].id)
  .catch(err => err);
  
  const isUsernameExists = await db(UserFields.Table)
  .count({ username: UserFields.Username })
  .where({ username })
  .then(response => response[0].username)
  .catch(err => err);
  
  
  const isEmailAddressExists = await db(UserFields.Table)
  .count({ email_address: UserFields.EmailAddress })
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
  let errors = {};
  
  if (username != undefined) {
    const isUsernameExists = await db(UserFields.Table)
    .count({ username: UserFields.Username })
    .whereNot({ id })
    .andWhere({ username })
    .then(response => response[0].username)
    .catch(err => err);
    
    Object.assign(errors, { isUsernameExists });
  }
  
  if (email_address != undefined) {
    const isEmailAddressExists = await db(UserFields.Table)
    .count({ email_address: UserFields.EmailAddress })
    .whereNot({ id })
    .andWhere({ email_address })
    .then(response => response[0].email_address)
    .catch(err => err);
  
    Object.assign(errors, { isEmailAddressExists });
  }
  
  console.log(errors);
  return errors;
}


/**
 * @description Checking if user record already exists.
 *
 * @param {string} id
 *
 * @returns {Promise<number>}
 */
export async function checkIfUserExists(id: string): Promise<any> {
  const isRecordExists = await db(UserFields.Table)
  .count({ id: UserFields.Id })
  .where({ id })
  .then(response => response[0].id)
  .catch(err => err);
  
  return { isRecordExists };
}