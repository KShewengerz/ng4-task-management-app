"use strict";

import { Request, Response, NextFunction } from "express";
import * as snakeCase from "snakecase-keys";
import * as camelCase from "camelcase-keys";

import * as dbConnection from "../../config/db";

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
  const userId = req.params.id;
  const body = req.body;
  const projectId = body.id;
  
  const insertProjectInfo = db(projectTable)
  .insert(body)
  .catch(err => err);
  
  const insertUserProject = db(userProjectTable)
  .insert({userId, projectId})
  .catch(err => err);
  
  await Promise.all([
    insertProjectInfo,
    insertUserProject
  ]);
  
  res.sendStatus(201);
}

/**
 * @api {put} /project/:projectId/user/:userId
 * @description Update Project by projectId and userId
 *
 * @apiParam {Uuid} projectId
 * @apiParam {Uuid} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export function updateProject(req: Request, res: Response) {
  res.json("Update Project");
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
export function getProjectsByUserId(req: Request, res: Response) {
  res.json("Get Projects");
}

/**
 * @api {get} /project/:projectId/user/:userId
 * @description Delete Project by projectId and user id
 *
 * @apiParam {Uuid} projectId
 * @apiParam {Uuid} userId
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export function deleteProject(req: Request, res: Response) {
  res.json("Delete Project");
}