"use strict";

import { Request, Response, NextFunction } from "express";
import * as snakeCase from "snakecase-keys";
import * as camelCase from "camelcase-keys";

import * as dbConnection from "../../config/db";

import { ErrorHandler } from "../error-handler/error-handler";
import { Table, Project, ProjectFields, Error, HttpVerb } from "../../shared/index";

const db = dbConnection.default;
const projectTable = Table.Project;


/**
 * @api {post} /
 * @description Add new project
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Promise<void>}
 */
export function addProject(req: Request, res: Response) {
  res.json("Add Project");
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