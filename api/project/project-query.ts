import { Response } from "express";
import * as camelCase from "camelcase-keys";

import * as dbConnection from "../../config/db";

import { projectValidation } from "./index";
import { UserProjectField, TableName, ProjectField } from "../../shared/enums/index";
import { Project } from "../../shared/interfaces/index";

const db = dbConnection.default;
const {Project: projectTable, UserProject: userProjectTable} = TableName;

//Temporary: TODO Create API Authentication
const userId = "fed78975-307f-44fa-8700-b5b52273d813 ";


/**
 * @description Insert New Project MySQL Query
 *
 * @param {Project} body
 * @param {String} projectId
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function addProjectQuery(projectId: string, body: Project, res: Response): Promise<void> {
  body.ordinal = await projectValidation.getNextUserProjectOrdinal(userId);
  
  const insertUserProjectData = {
    [UserProjectField.UserId]: userId,
    [UserProjectField.ProjectId]: projectId
  };
  
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
 * @description Update Project MySQL Query
 *
 * @param {String} id
 * @param {Project} body
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function updateProject(id: string, body: Project, res: Response): Promise<void> {
  await db(projectTable)
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
export async function getProjects(): Promise<Project[]> {
  const projectTableId = `${projectTable}.${ProjectField.Id}`;
  const userProjectTableProjectId = `${userProjectTable}.${UserProjectField.ProjectId}`;
  const userProjectTableUserId = `${userProjectTable}.${UserProjectField.UserId}`;
  
  const fetchProjects = await db(projectTable)
  .select(ProjectField.Id, ProjectField.Name, ProjectField.Color, ProjectField.Ordinal)
  .leftJoin(userProjectTable, projectTableId, userProjectTableProjectId)
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
  const fetchProject = await db(projectTable)
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
  const deleteProject = await db(projectTable)
  .where({id})
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}