"use strict";

import * as dbConnection from "../../config/db";

import { TableName, TaskField, UserTaskField } from "../../shared/enums/index";

const db = dbConnection.default;
const { Task: taskTable, UserTask: userTaskTable } = TableName;

//Temporary: TODO Create API Authentication
const userId = "6b5deafc-fa59-4899-b427-970f13210630";


/**
 * @description Description Validation - checking if description already exists within user's tasks;
 *
 * @param {String} description
 *
 * @returns {any[]}
 */
export async function getDescriptionValidation(description: string): Promise<any> {
  const isDescriptionExists = await db(taskTable)
  .count({ id: TaskField.Id })
  .leftJoin(userTaskTable, TaskField.Id, UserTaskField.TaskId)
  .whereRaw(`description = '${description}' AND ${UserTaskField.UserId} = '${userId}'`)
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
  const isRecordExists = await db(taskTable)
  .count({ id: TaskField.Id })
  .where({ id })
  .then(response => response[0].id)
  .catch(err => err);
  
  return { isRecordExists };
}

export async function getPutValidation(id: string, description: string): Promise<any> {
  let condition: any = {};
  
  const descriptionCondition = await getDescriptionValidation(description);
  const recordCondition = await checkIfTaskExists(id);
  
  condition.isDescriptionExists = descriptionCondition.isDescriptionExists;
  condition.isRecordExists = recordCondition.isRecordExists;
  
  return condition;
}


