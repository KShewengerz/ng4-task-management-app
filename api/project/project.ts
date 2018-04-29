"use strict";

import { Request, Response, NextFunction } from "express";
import * as snakeCase from "snakecase-keys";
import * as camelCase from "camelcase-keys";

import * as dbConnection from "../../config/db";
import * as projectValidation from "./project-validation";

import { ErrorHandler } from "../error-handler/error-handler";
import { TableName, Project, ProjectField, UserProjectField, Error, HttpVerb } from "../../shared/index";

const db = dbConnection.default;
const projectTable = TableName.Project;
const userProjectTable = TableName.UserProject;


/**
 * @api {post} /user/:userId
 * @description Add new project by userId
 *
 * @apiParam {String} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function addProjectByUserId(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId;
  const body = snakeCase(req.body);
  const projectId = body.id;
  
  const insertUserProjectData = {
    [UserProjectField.UserId]: userId,
    [UserProjectField.ProjectId]: projectId
  };
  
  body.ordinal = await projectValidation.getNextUserProjectOrdinal(userId);
  
  //TODO: Validation on checking if user exists
  //TODO: Validation on inserting duplicate id
  
  const insertProjectInfo = db(projectTable)
  .insert(body)
  .catch(err => err);

  const insertUserProject = db(userProjectTable)
  .insert(insertUserProjectData)
  .catch(err => err);

  await Promise.all([
    insertProjectInfo,
    insertUserProject
  ])
  .catch(err => err);
  
  res.sendStatus(201);
}

/**
 * @api {put} /:id
 * @description Update Project by projectId
 *
 * @apiParam {Uuid} projectId
 * @apiParam {Uuid} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function updateProject(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const body = snakeCase(req.body);
  
  //TODO: Validation on checking if project does not exists
  //TODO: Validation on checking if name and color already exists based user projects.
  
  const updateProject = await db(projectTable)
  .where({id})
  .update(body)
  .catch(err => err);
  
  res.sendStatus(200);
}

/**
 * @api {get} /user/:userId
 * @description Get projects by userId
 *
 * @apiParam {Uuid} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export async function getProjectsByUserId(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId;
  const projectTableId = `${projectTable}.${ProjectField.Id}`;
  const userProjectTableProjectId = `${userProjectTable}.${UserProjectField.ProjectId}`;
  const userProjectTableUserId = `${userProjectTable}.${UserProjectField.UserId}`;
  
  //TODO: Validation on checking if userId and projectId exists
  
  const fetchProjects = await db(projectTable)
  .select(ProjectField.Id, ProjectField.Name, ProjectField.Color, ProjectField.Ordinal)
  .leftJoin(userProjectTable, projectTableId, userProjectTableProjectId)
  .whereNull(userProjectTableUserId)
  .orWhere(userProjectTableUserId, userId)
  .catch(err => err);
  
  const result = camelCase(fetchProjects);
  
  res.json(<Project>result);
}


/**
 * @api {get} /:id
 * @description Get project by projectId
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
  
  //TODO: Check if project exists
  
  const fetchProject = await db(projectTable)
  .where({id})
  .catch(err => err);
  
  const result = camelCase(fetchProject);
  
  res.json(<Project>result);
}

/**
 * @api {get} /:id
 * @description Delete Project by projectId
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
  
  //TODO: Check if project exists
  
  const deleteProject = await db(projectTable)
  .where({id})
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}