import { Response } from "express";
import * as moment from "moment";

import * as dbConnection from "../../config/db";

import { UserTaskFields, TaskFields, TaskSchedule, ProjectFields, UserProjectFields } from "../../shared/enums/-index";
import { Task } from "../../shared/interfaces/-index";

const camelCase = require("camelcase-keys");

const db         = dbConnection.default;
const dateFormat = "MM/DD/YYYY";


/**
 * @description Insert New Task MySQL Query
 *
 * @param {Project} body
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function addTaskQuery(userId: string, body: Task, res: Response): Promise<void> {
  const insertUserTaskFieldsData = {
    [UserTaskFields.UserId]: userId,
    [UserTaskFields.TaskId]: body.id
  };
  
  const insertTaskInfo = db(TaskFields.Table)
  .insert(body)
  .catch(err => err);
  
  const insertUserTaskFields = db(UserTaskFields.Table)
  .insert(insertUserTaskFieldsData)
  .catch(err => err);
  
  await Promise.all([
    insertTaskInfo,
    insertUserTaskFields
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
  await db(TaskFields.Table)
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
export async function getUserTasks(userId: string, projectId: any, statusId: number): Promise<Task[]> {
  const taskTableId         = `${TaskFields.Table}.${TaskFields.Id}`;
  const userTaskTableTaskId = `${UserTaskFields.Table}.${UserTaskFields.TaskId}`;
  const now                 = moment().format(dateFormat);
  const startOfNextWeek     = moment().add(1, "weeks").startOf("isoWeek").subtract(1, "days").format(dateFormat);
  const endOfNextWeek       = moment().add(1, "weeks").endOf("isoWeek").subtract(1, "days").format(dateFormat);

  let fetchTasks: any;

  if (projectId < 3 && statusId === 1) {
    fetchTasks = await db(TaskFields.Table)
    .select(`${TaskFields.Table}.*`)
    .innerJoin(UserTaskFields.Table, taskTableId, userTaskTableTaskId)
    .where({
      [UserTaskFields.UserId]  : userId,
      [TaskFields.StatusId]    : 1,
      [TaskFields.CompletedOn] : now
    })
    .catch(err => err);
  }
  else if (statusId == 2) {
    const id = projectId == 0 ? null : projectId;

    fetchTasks = await db(TaskFields.Table)
    .select(`${TaskFields.Table}.*`)
    .innerJoin(UserTaskFields.Table, taskTableId, userTaskTableTaskId)
    .where({
      [UserTaskFields.UserId] : userId,
      [TaskFields.ProjectId]  : id,
      [TaskFields.StatusId]   : 0
    })
    .whereNot(TaskFields.ScheduleDate, now)
    .catch(err => err);
  }
  else if (projectId === TaskSchedule.NextWeek) {
    fetchTasks = await db(TaskFields.Table)
    .select(`${TaskFields.Table}.*`)
    .innerJoin(UserTaskFields.Table, taskTableId, userTaskTableTaskId)
    .where(UserTaskFields.UserId, userId)
    .andWhereBetween(TaskFields.ScheduleDate, [startOfNextWeek, endOfNextWeek])
    .catch(err => err);
  } 
  else  {
    const secondaryCondition  = getUserTaskSecondaryCondition(projectId);
  
    fetchTasks = await db(TaskFields.Table)
    .select(`${TaskFields.Table}.*`)
    .innerJoin(UserTaskFields.Table, taskTableId, userTaskTableTaskId)
    .where(UserTaskFields.UserId, userId)
    .andWhere(secondaryCondition)
    .catch(err => err);
  }
  
  const result = await camelCase(fetchTasks);
  const tasks  = statusId != 2 ? result.filter(task => task.statusId == statusId) : result;

  return tasks;
}


/**
 * @description Returns user task secondary condition
 * 
 * @param projectId 
 * 
 * @returns {Any}
 */
function getUserTaskSecondaryCondition (projectId: any): any {
  const now      = moment().format(dateFormat);
  const tomorrow = moment().add(1, "days").format(dateFormat);

  let secondaryCondition: any = {};

  if (projectId.length == 1) {
    if (projectId === TaskSchedule.Today) secondaryCondition = { [TaskFields.ScheduleDate]: now };
    else if (projectId === TaskSchedule.Tomorrow) secondaryCondition = { [TaskFields.ScheduleDate]: tomorrow };
  }
  else secondaryCondition = { [TaskFields.ProjectId]: projectId };

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
  const now = moment().format(dateFormat);

  await db(TaskFields.Table)
  .where({ id })
  .update({ 
    [TaskFields.StatusId]: 1,
    [TaskFields.CompletedOn]: now
  })
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
      await db(TaskFields.Table)
      .where(TaskFields.Id, task.id)
      .update(task)
      .transacting(trx)
      .catch(err => err);
    });
  })
  .catch(err => err);
  
  res.sendStatus(200);
}


/**
 * @description Reschedules a task based on its taskId and scheduleType
 *
 * @param {String} id
 * @param {Number} schedule
 * @param {e.Response} res
 *
 * @returns {Promise<void>}
 */
export async function rescheduleTask({ id, schedule }, res: Response): Promise<void> {
  const now              = moment().format(dateFormat);
  const tomorrow         = moment().add(1, "days").format(dateFormat);
  const startOfNextWeek  = moment().add(1, "weeks").startOf("isoWeek").subtract(1, "days").format(dateFormat);
  
  const newScheduledDate = schedule == TaskSchedule.Today ? now :
                           schedule == TaskSchedule.Tomorrow ? tomorrow : startOfNextWeek;
  
  await db(TaskFields.Table)
  .where({ id })
  .update(TaskFields.ScheduleDate, newScheduledDate)
  .catch(err => err);
  
  res.status(200).send(newScheduledDate);
}