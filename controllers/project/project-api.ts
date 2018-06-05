"use strict";

import { Request, Response } from "express";
import * as snakeCase from "snakecase-keys";
import * as uuid from "uuid/v4";

import { ProjectField } from "../../shared/enums/index";
import { Project } from "../../shared/interfaces/index";
import { projectQuery, projectValidation, projectErrorHandler } from "./index";


/**
 * @api {post} /
 * @description Add new project.
 *
 * @apiParam {String} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function addProjectByUserId(req: Request, res: Response): Promise<void> {
  const body: Project = snakeCase(req.body);
  body.id = uuid();
  
  const condition = await projectValidation.getPostBodyValidation(body);
  
  await projectErrorHandler.postErrorHandler(condition, res);
  
  if (res.statusCode !== 400) await projectQuery.addProjectQuery(body, res);
}

/**
 * @api {put} /:id
 * @description Update Project by projectId.
 *
 * @apiParam {Uuid} projectId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function updateProject(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const body: Project = snakeCase(req.body);
  
  const condition = await projectValidation.getPutBodyValidation(body, id);
  
  await projectErrorHandler.putErrorHandler(condition, res);
  
  if (res.statusCode !== 400) await projectQuery.updateProject(id, body, res);
}

/**
 * @api {get} /
 * @description Get user projects.
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function getProjects(req: Request, res: Response): Promise<void> {
  const projects = await projectQuery.getProjects();
  res.json(<Project[]>projects);
}


/**
 * @api {get} /:id
 * @description Get project by projectId.
 *
 * @apiParam {Uuid} id
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function getProjectById(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  
  const condition = await projectValidation.getBodyValidation(ProjectField.Id, id);
  
  await projectErrorHandler.getAndDeleteErrorHandler(condition, res);
  
  if (res.statusCode !== 404) {
    const project = await projectQuery.getProjectById(id);
    res.json(<Project>project);
  }
}

/**
 * @api {get} /:id
 * @description Delete Project by projectId.
 *
 * @apiParam {Uuid} id
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function deleteProject(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  
  const condition = await projectValidation.getBodyValidation(ProjectField.Id, id);
  
  await projectErrorHandler.getAndDeleteErrorHandler(condition, res);
  
  if (res.statusCode !== 404) await projectQuery.deleteProject(id, res);
}
