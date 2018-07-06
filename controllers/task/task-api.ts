"use strict";

import { Request, Response } from "express";
import * as uuid from "uuid/v4";
import * as moment from "moment";

import { Task } from "../../shared/interfaces/-index";
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
  const defaultProject = "a51527b4-ef26-4dc3-aafb-eb9358f51b69"; //By default Personal Project
  
  body.id             = uuid();
  body.project_id    = body.project_id.length == 1 ?  defaultProject : body.project_id;
  body.status_id     = "11e1c71d-475b-4f2f-a14e-20c76e45aef6";  //By default Open Task.
  body.schedule_date = moment().format("MM/DD/YYYY");           //By default current date.
  body.ordinal       = await taskValidation.getNextUserTaskOrdinal(userId, body.project_id);

  const condition = await taskValidation.getDescriptionValidation(userId, body.description);
  
  await taskErrorHandler.postErrorHandler(condition, res);
  
  if (res.statusCode !== 400) taskQuery.addTaskQuery(userId, body, res);
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
  await taskQuery.updateTasksOrdinal(req.body, res);
}


/**
 * @api {get} /:projectId
 * @apiParam {any} projectId
 * 
 * @description Gets all user tasks.
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function getTasksByProjectId(req: any, res: Response): Promise<void> {
  const projectId = req.params.projectId;
  const userId    = await getSessionUserId(req.sessionID); 

  const tasks     = await taskQuery.getUserTasks(userId, projectId);
  
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

