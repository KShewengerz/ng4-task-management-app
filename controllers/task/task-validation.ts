"use strict";

import * as dbConnection from "../../config/db";

import { Task, UserTask } from "../../shared/enums/-index";

const db = dbConnection.default;


/**
 * @description Description Validation - checking if description already exists within user's tasks;
 *
 * @param {String} description
 *
 * @returns {any[]}
 */
export async function getDescriptionValidation(userId: string, description: string): Promise<any> {
  const isDescriptionExists = await db(Task.Table)
  .count({ id: Task.Id })
  .leftJoin(UserTask.Table, Task.Id, UserTask.TaskId)
  .whereRaw(`description = '${description}' AND ${UserTask.UserId} = '${userId}'`)
  .then(response => response[0].id)
  .catch(err => err);
  
  return { isDescriptionExists };
}


/**
 * @description Checking if task record already exists.
 *
 * @param {string} id
 *
 * @returns {Promise<number>}
 */
export async function checkIfTaskExists(id: string): Promise<any> {
  const isRecordExists = await db(Task.Table)
  .count({ id: Task.Id })
  .where({ id })
  .then(response => response[0].id)
  .catch(err => err);
  
  return { isRecordExists };
}

export async function getPutValidation(id: string, userId: string, description: string): Promise<any> {
  let condition: any = {};
  
  const descriptionCondition = await getDescriptionValidation(userId, description);
  const recordCondition = await checkIfTaskExists(id);
  
  condition.isDescriptionExists = descriptionCondition.isDescriptionExists;
  condition.isRecordExists = recordCondition.isRecordExists;
  
  return condition;
}


