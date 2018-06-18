import { Response } from "express";

import * as dbConnection from "../../config/db";

import { projectValidation } from "./-index";
import { UserProject, Project as ProjectEnum } from "../../shared/enums/-index";
import { Project } from "../../shared/interfaces/-index";

const db = dbConnection.default;

const camelCase = require("camelcase-keys");


/**
 * @description Insert New Project MySQL Query
 *
 * @param {Project} body
 * @param {String} projectId
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function addProjectQuery(userId: string, body: Project, res: Response): Promise<void> {
  body.ordinal = await projectValidation.getNextUserProjectOrdinal(userId);
  
  const insertUserProjectData = {
    [UserProject.UserId]: userId,
    [UserProject.ProjectId]: body.id
  };
  
  const insertProjectInfo = db(ProjectEnum.Table)
  .insert(body)
  .catch(err => err);
  
  const insertUserProject = db(UserProject.Table)
  .insert(insertUserProjectData)
  .catch(err => err);
  
  await Promise.all([
    insertProjectInfo,
    insertUserProject
  ])
  .catch(err => err);
  
  res.status(201).send({projectColor: body.color});
}


/**
 * @description Update Project MySQL Query
 *
 * @param {String} id
 * @param {Project} body
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function updateProject(id: string, body: Project, res: Response): Promise<void> {
  await db(ProjectEnum.Table)
  .where({id})
  .update(body)
  .catch(err => err);
  
  res.sendStatus(200);
}


/**
 * @description Get User Projects MySQL Query
 *
 * @returns {Promise<Project[]>}
 */
export async function getProjects(userId: string): Promise<Project[]> {
  const projectTableId = `${ProjectEnum.Table}.${ProjectEnum.Id}`;
  const userProjectTableProjectId = `${UserProject.Table}.${UserProject.ProjectId}`;
  const userProjectTableUserId = `${UserProject.Table}.${UserProject.UserId}`;
  
  const fetchProjects = await db(ProjectEnum.Table)
  .select(ProjectEnum.Id, ProjectEnum.Name, ProjectEnum.Color, ProjectEnum.Ordinal)
  .leftJoin(UserProject.Table, projectTableId, userProjectTableProjectId)
  .whereNull(userProjectTableUserId)
  .orWhere(userProjectTableUserId, userId)
  .catch(err => err);
  
  const result = camelCase(fetchProjects);
  
  return result;
}


/**
 * @description Get Project by Id MySQL Query
 *
 * @param {String} id
 *
 * @returns {Promise<Project>}
 */
export async function getProjectById(id: string): Promise<Project> {
  const fetchProject = await db(ProjectEnum.Table)
  .where({id})
  .catch(err => err);
  
  const result = camelCase(fetchProject);
  
  return result;
}


/**
 * @description Delete Project by Id MySQL Query
 *
 * @param {String} id
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function deleteProject(id: string, res: Response): Promise<void> {
  const deleteProject = await db(ProjectEnum.Table)
  .where({id})
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}