"use strict";

import { Request, Response } from "express";
import * as snakeCase from "snakecase-keys";

import { ProjectField, HttpVerb } from "../../shared/enums/index";
import { Project } from "../../shared/interfaces/index";
import { projectQuery, projectValidation, projectErrorHandler } from "./index";

//Temporary: TODO Create API Authentication
const userId = "72fd18d3-8403-4376-a486-05bdecc88b2a";


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
  const projectId = body.id;
  
  const {isProjectExists, isProjectNameExists, isProjectColorExists} = await projectValidation.validateDuplicateBodyFields(body);
  
  if (!isProjectExists && !isProjectNameExists && !isProjectColorExists) await projectQuery.addProjectQuery(projectId, body, res);
  else {
    const conditions = {isProjectExists, isProjectNameExists, isProjectColorExists};
    await projectErrorHandler.postErrorHandler(conditions, res);
  }
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
  const PUT = HttpVerb.PUT;
  const body: Project = snakeCase(req.body);
  
  //TODO: Enhance Validation when already exist name and color in the same projectId.
  const {isProjectExists, isProjectNameExists, isProjectColorExists} = await projectValidation.validateDuplicateBodyFields(body, id, PUT);
  
  if (isProjectExists && !isProjectNameExists && !isProjectColorExists) await projectQuery.updateProject(id, body, res);
  else {
    const condition = {isProjectExists, isProjectNameExists, isProjectColorExists};
    await projectErrorHandler.putErrorHandler(condition, res);
  }
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
  const projectCondition = {field: ProjectField.Id, value: id};
  
  const isProjectExists = await projectValidation.checkIfValueExistsWithinUserProject(projectCondition);
  
  if (isProjectExists) {
    const project = await projectQuery.getProjectById(id);
    res.json(<Project>project);
  }
  else await projectErrorHandler.getAndDeleteErrorHandler(res);
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
  const projectCondition = {field: ProjectField.Id, value: id};
  
  const isProjectExists = await projectValidation.checkIfValueExistsWithinUserProject(projectCondition);
  
  if (isProjectExists) await projectQuery.deleteProject(id, res);
  else await projectErrorHandler.getAndDeleteErrorHandler(res);
}
