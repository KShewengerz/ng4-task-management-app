"use strict";

import * as dbConnection from "../../config/db";

import { TableName, TaskField, UserTaskField } from "../../shared/enums/index";

const db = dbConnection.default;
const { Task: taskTable, UserTask: userTaskTable } = TableName;

//Temporary: TODO Create API Authentication
const userId = "fed78975-307f-44fa-8700-b5b52273d813 ";


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


