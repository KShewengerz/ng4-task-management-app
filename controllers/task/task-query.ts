import { Response } from "express";

import * as dbConnection from "../../config/db";

import { UserTask, Task as TaskEnum } from "../../shared/enums/-index";
import { Task } from "../../shared/interfaces/-index";

const camelCase = require("camelcase-keys");

const db = dbConnection.default;


/**
 * @description Insert New Task MySQL Query
 *
 * @param {Project} body
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function addTaskQuery(userId: string, body: Task, res: Response): Promise<void> {
  const insertUserTaskData = {
    [UserTask.UserId]: userId,
    [UserTask.TaskId]: body.id
  };
  
  const insertTaskInfo = db(TaskEnum.Table)
  .insert(body)
  .catch(err => err);
  
  const insertUserTask = db(UserTask.Table)
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
  await db(TaskEnum.Table)
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
export async function getUserTasks(userId: string, projectId: any): Promise<Task[]> {
  const taskTableId = `${TaskEnum.Table}.${TaskEnum.Id}`;
  const userTaskTableTaskId = `${UserTask.Table}.${UserTask.TaskId}`;
  
  const fetchTasks = await db(TaskEnum.Table)
  .select(`${TaskEnum.Table}.*`)
  .innerJoin(UserTask.Table, taskTableId, userTaskTableTaskId)
  .where({ [UserTask.UserId]: userId })
  .andWhere({ [TaskEnum.ProjectId]: projectId })
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
  const deleteProject = await db(TaskEnum.Table)
  .where({ id })
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}
