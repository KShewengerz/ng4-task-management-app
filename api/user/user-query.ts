import { Response } from "express";
import * as camelCase from "camelcase-keys";

import * as dbConnection from "../../config/db";

import { TableName } from "../../shared/enums";
import { User } from "../../shared/interfaces/index";

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
export async function addNewUser(body: User, res: Response): Promise<void> {
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
export async function updateUser(id: string, body: User, res: Response): Promise<void> {
  await db(userTable)
  .where({ id })
  .update(body)
  .catch(err => err);
  
  res.sendStatus(200);
}


/**
 * @description Get User By Id MySQL Query
 *
 * @param {String} id
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function getUser(id: string, res: Response): Promise<void> {
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
export async function deleteUser(id: string, res: Response): Promise<void> {
  await db(userTable)
  .where({ id })
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}