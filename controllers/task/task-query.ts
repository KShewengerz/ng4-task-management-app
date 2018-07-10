import { Response } from "express";
import * as moment from "moment";

import * as dbConnection from "../../config/db";

import { UserTask, Task as TaskEnum, TaskSchedule } from "../../shared/enums/-index";
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
  
  res.status(201).send(body);
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
  const taskTableId         = `${TaskEnum.Table}.${TaskEnum.Id}`;
  const userTaskTableTaskId = `${UserTask.Table}.${UserTask.TaskId}`;
  const dateFormat          = "MM/DD/YYYY";
  const startOfNextWeek     = moment().add(1, 'weeks').startOf("isoWeek").subtract(1, "days").format(dateFormat);
  const endOfNextWeek       = moment().add(1, 'weeks').endOf("isoWeek").subtract(1, "days").format(dateFormat);

  let fetchTasks: any;

  if (projectId === TaskSchedule.NextWeek) {
    fetchTasks = await db(TaskEnum.Table)
    .select(`${TaskEnum.Table}.*`)
    .innerJoin(UserTask.Table, taskTableId, userTaskTableTaskId)
    .where({ [UserTask.UserId]: userId })
    .andWhereBetween(TaskEnum.ScheduleDate, [startOfNextWeek, endOfNextWeek])
    .catch(err => err);
  } else {
    const secondaryCondition  = getUserTaskSecondaryCondition(projectId, dateFormat);

    fetchTasks = await db(TaskEnum.Table)
    .select(`${TaskEnum.Table}.*`)
    .innerJoin(UserTask.Table, taskTableId, userTaskTableTaskId)
    .where({ [UserTask.UserId]: userId })
    .andWhere(secondaryCondition)
    .catch(err => err);
  }
  
  const result = camelCase(fetchTasks);

  return result;
}


/**
 * @description Returns user task secondary condition
 * 
 * @param projectId 
 * 
 * @returns {Any}
 */
function getUserTaskSecondaryCondition (projectId: any, dateFormat: string): any {
  const now      = moment().format(dateFormat);
  const tomorrow = moment().add("days", 1).format(dateFormat);

  let secondaryCondition: any = {};

  if (projectId.length == 1) {
    if (projectId === TaskSchedule.Today) secondaryCondition = { [TaskEnum.ScheduleDate]: now };
    else if (projectId === TaskSchedule.Tomorrow) secondaryCondition = { [TaskEnum.ScheduleDate]: tomorrow };
  }
  else secondaryCondition = { [TaskEnum.ProjectId]: projectId };

  return secondaryCondition;
}


/**
 * @description Complete Task by Id MySQL Query
 *
 * @param {String} id
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function completeTaskQuery(id: string, res: Response): Promise<void> {
  await db(TaskEnum.Table)
  .where({ id })
  .update({ [TaskEnum.StatusId]: 1 })
  .catch(err => err);
  
  res.sendStatus(200);
}


/**
 * @description Update All Tasks Ordinal MySQL Query
 *
 * @param {Project} projects
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function updateTasksOrdinal(tasks: Task[], res: Response): Promise<void> {
  await db.transaction(async trx => {
    await tasks.forEach(async task => {
      await db(TaskEnum.Table)
      .where(TaskEnum.Id, task.id)
      .update(task)
      .transacting(trx)
      .catch(err => err);
    });
  })
  .catch(err => err);
  
  res.sendStatus(200);
}