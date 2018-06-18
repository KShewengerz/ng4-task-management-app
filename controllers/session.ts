import * as dbConnection from "../config/db";
import { UserSession } from "../shared/enums/-index";

const db = dbConnection.default;
const snakeCase = require("snakecase-keys");


/**
 * @description Save User Session
 *
 * @param {String} sessionId
 * @param {String} userId
 *
 * @returns {Promise<void>}
 */
export async function saveSession(session: any): Promise<void> {
  const body = snakeCase(session);
  
  await db(UserSession.Table)
  .insert(body)
  .catch(err => err);
}

export async function getLastActiveSession(): Promise<string> {
  const lastUserActiveSession = await db(UserSession.Table)
  .max({ [UserSession.Id]: UserSession.Id })
  .where({ [UserSession.isLoggedOut]: false })
  .catch(err => err);
  
  const existingUserId = lastUserActiveSession[0].id;
  
  return existingUserId;
}

/**
 * @description Get User Session ID
 *
 * @returns {Promise<void>}
 */
export async function getSessionUserId(id: string): Promise<string> {
  const existingUserId = await getLastActiveSession();

  const user = await db(UserSession.Table)
  .where({ [UserSession.Id]: existingUserId })
  .catch(err => err);

  const userId = user[0].user_id;
  
  return userId;
}


/**
 * @description Remove User Session
 *
 * @returns {Promise<void>}
 */
export async function removeUserSession(id: string): Promise<void> {
  await db(UserSession.Table)
  .where({ [UserSession.Id]: id })
  .update({ [UserSession.isLoggedOut]: 1 })
  .catch(err => err);
}