"use strict";

import { Request, Response } from "express";
import * as snakeCase from "snakecase-keys";
import * as uuid from "uuid/v4";

import { Task } from "../../shared/interfaces/index";
import { taskQuery, taskValidation, taskErrorHandler } from "./index";


/**
 * @api {post} /
 * @description Adds new task.
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function addTask(req: Request, res: Response): Promise<void> {
  const body: Task = snakeCase(req.body);
  body.id = uuid();
  
  const condition = await taskValidation.getDescriptionValidation(body.description);
  
  await taskErrorHandler.postandPutErrorHandler(condition, res);
  
  if (res.statusCode !== 400) taskQuery.addTaskQuery(body, res);
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
export async function updateTask(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const body: Task = snakeCase(req.body);
  
  const condition = await taskValidation.getDescriptionValidation(body.description);
  
  await taskErrorHandler.postandPutErrorHandler(condition, res);
  
  if (res.statusCode !== 400) await taskQuery.updateTaskQuery(id, body, res);
}


/**
 * @api {get} /
 * @description Gets all user tasks.
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function getTasks(req: Request, res: Response): Promise<void> {
  const tasks = await taskQuery.getUserTasks();
  res.json(<Task[]>tasks);
}


/**
 * @api {delete} /:id
 * @description Adds new task.
 *
 * @apiParam {Uuid} id
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function deleteTask(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  
  const condition = await taskValidation.checkIfTaskExists(id);
  
  await taskErrorHandler.deleteErrorHandler(condition, res);
  
  if (res.statusCode !== 404) await taskQuery.deleteTaskQuery(id, res);
}

