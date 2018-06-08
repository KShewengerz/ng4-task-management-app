import { Response } from "express";

import * as dbConnection from "../../config/db";

import { TableName } from "../../shared/enums";
import { User } from "../../shared/interfaces/index";

const camelCase = require("camelcase-keys");

const db = dbConnection.default;
const { User: userTable } = TableName;


/**
 * @description Insert New User MySQL Query
 *
 * @param {User} body
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function addNewUserQuery(body: User, res: Response): Promise<void> {
  console.log("enter query");
  console.log(body);
  await db(userTable)
  .insert(body)
  .catch(err => err);
  
  res.sendStatus(201);
}


/**
 * @description Update Project MySQL Query
 *
 * @param {String} id
 * @param {User} body
 *
 * @returns {Promise<void>}
 */
export async function updateUserQuery(id: string, body: User, res: Response): Promise<void> {
  await db(userTable)
  .where({ id })
  .update(body)
  .catch(err => err);
  
  res.sendStatus(200);
}


/**
 * @description Get All Users MySQL Query
 *
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function getAllUserQuery(res: Response): Promise<void> {
  const fetchUser = await db(userTable).select();
  const result = camelCase(fetchUser);
  
  res.json(<User[]>result);
}


/**
 * @description Get User By Id MySQL Query
 *
 * @param {String} id
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function getUserQuery(id: string, res: Response): Promise<void> {
  const fetchUser = await db(userTable).where({ id });
  const result = camelCase(fetchUser);
  
  res.json(<User>result);
}


/**
 * @description Delete User By Id MySQL Query
 *
 * @param {String} id
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function deleteUserQuery(id: string, res: Response): Promise<void> {
  await db(userTable)
  .where({ id })
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}