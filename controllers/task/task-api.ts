"use strict";

import { Request, Response } from "express";
import * as uuid from "uuid/v4";
import * as moment from "moment";

import { Task } from "../../shared/interfaces/-index";
import { TaskSchedule } from "../../shared/enums/-index";
import { taskQuery, taskValidation, taskErrorHandler } from "./-index";
import { getSessionUserId } from "../session";

const snakeCase = require("snakecase-keys");


/**
 * @api {post} /
 * @description Adds new task.
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function addTask(req: any, res: Response): Promise<void> {
  const userId         = await getSessionUserId(req.sessionID);;
  const body           = snakeCase(req.body);
  
  body.id            = uuid();
  body.schedule_date = setTaskScheduleDate(body.project_id);  
  body.project_id    = body.project_id.length == 1 ?  null : body.project_id;
  body.status_id     = 0;  //By default Open Task.
  body.ordinal       = await taskValidation.getNextUserTaskOrdinal(userId, body.project_id);

  const condition = await taskValidation.getDescriptionValidation(userId, body.description);
  
  await taskErrorHandler.postErrorHandler(condition, res);
  
  if (res.statusCode !== 400) taskQuery.addTaskQuery(userId, body, res);
}


/**
 * @description Sets Project Task Schedule Date based on its scheduleId
 *
 * @param {string} projectId
 *
 * @returns {string}
 */
function setTaskScheduleDate(scheduleId: string): string {
  const dateFormat      = "MM/DD/YYYY";
  const today           = moment().format(dateFormat);  
  const tomorrow        = moment().add(1, "days").format(dateFormat);
  const nextWeek        = moment().add(1, "weeks").startOf("isoWeek").subtract(1, "days").format(dateFormat);

  let scheduleDate: string;

  if (scheduleId === TaskSchedule.Today) scheduleDate = today;
  else if (scheduleId === TaskSchedule.Tomorrow) scheduleDate = tomorrow;
  else if (scheduleId === TaskSchedule.NextWeek) scheduleDate = nextWeek;
  else scheduleDate = null;

  return scheduleDate;
}


/**
 * @api {put} /:id
 * @description Updates task information.
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function updateTask(req: any, res: Response): Promise<void> {
  const id          = req.params.id;
  const userId      = await getSessionUserId(req.sessionID);
  const body: Task  = snakeCase(req.body);
  
  const condition = await taskValidation.getPutValidation(id, userId, body.description);
  
  await taskErrorHandler.putErrorHandler(condition, res);

  if (res.statusCode !== 400) await taskQuery.updateTaskQuery(id, body, res);
}


/**
 * @apiUrl {put} /
 * @description Update Tasks Ordinal Sequence
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function updateTasksOrdinal(req: Request, res: Response): Promise<void> {
  const body = snakeCase(req.body);
  await taskQuery.updateTasksOrdinal(body, res);
}


/**
 * @api {get} /:projectId
 * @apiParam {any} projectId
 * 
 * @description Gets all open tasks.
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function getTasks(req: any, res: Response): Promise<void> {
  const projectId = req.params.projectId;
  const status    = req.params.status;
  const statusId  = status === "open" ? 0 : status === "completed" ? 1 : 2;
  const userId    = await getSessionUserId(req.sessionID); 
  const tasks     = await taskQuery.getUserTasks(userId, projectId, statusId);

  res.json(<Task[]>tasks);
}


/**
 * @api {put} /:id
 * @description Mark task as complete.
 *
 * @apiParam {Uuid} id
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function completeTask(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  
  const condition = await taskValidation.checkIfTaskExists(id);
  
  await taskErrorHandler.completeTaskErrorHandler(condition, res);
  
  if (res.statusCode !== 404) await taskQuery.completeTaskQuery(id, res);
}

