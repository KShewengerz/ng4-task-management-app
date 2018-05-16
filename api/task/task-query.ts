import { Response } from "express";
import * as camelCase from "camelcase-keys";

import * as dbConnection from "../../config/db";

import { TableName, UserTaskField, TaskField, ProjectField } from "../../shared/enums";
import { Task } from "../../shared/interfaces/index";

const db = dbConnection.default;
const { Task: taskTable, UserTask: userTaskTable } = TableName;

//Temporary: TODO Create API Authentication
const userId = "fed78975-307f-44fa-8700-b5b52273d813 ";


/**
 * @description Insert New Task MySQL Query
 *
 * @param {Project} body
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function addTaskQuery(body: Task, res: Response): Promise<void> {
  const insertUserTaskData = {
    [UserTaskField.UserId]: userId,
    [UserTaskField.TaskId]: body.id
  };
  
  const insertTaskInfo = db(taskTable)
  .insert(body)
  .catch(err => err);
  
  const insertUserTask = db(userTaskTable)
  .insert(insertUserTaskData)
  .catch(err => err);
  
  await Promise.all([
    insertTaskInfo,
    insertUserTask
  ])
  .catch(err => err);
  
  res.sendStatus(201);
}


/**
 * @description Update Task MySQL Query
 *
 * @param {String} id
 * @param {Project} body
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function updateTaskQuery(id, body, res): Promise<void> {
  await db(taskTable)
  .where({ id })
  .update(body)
  .catch(err => err);
  
  res.sendStatus(200);
}


/**
 * @description Get User Tasks MySQL Query
 *
 * @returns {Promise<Task[]>}
 */
export async function getUserTasks(): Promise<Task[]> {
  const taskTableId = `${taskTable}.${TaskField.Id}`;
  const userTaskTableTaskId = `${userTaskTable}.${UserTaskField.TaskId}`;
  
  const fetchTasks = await db(taskTable)
  .leftJoin(userTaskTable, taskTableId, userTaskTableTaskId)
  .where({ [UserTaskField.UserId]: userId })
  .catch(err => err);
  
  const result = camelCase(fetchTasks);
  
  return result;
}


/**
 * @description Delete Task by Id MySQL Query
 *
 * @param {String} id
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function deleteTaskQuery(id: string, res: Response): Promise<void> {
  const deleteProject = await db(taskTable)
  .where({ id })
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}
