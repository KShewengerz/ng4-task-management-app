import { Response } from "express";

import * as dbConnection from "../../config/db";

import { projectValidation } from "./-index";
import { UserProjectFields, ProjectFields } from "../../shared/enums/-index";
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
  const {id, color} = body;
  body.ordinal = await projectValidation.getNextUserProjectOrdinal(userId);
  
  const insertUserProjectFieldsData = {
    [UserProjectFields.UserId]: userId,
    [UserProjectFields.ProjectId]: body.id
  };
  
  const insertProjectInfo = db(ProjectFields.Table)
  .insert(body)
  .catch(err => err);
  
  const insertUserProjectFields = db(UserProjectFields.Table)
  .insert(insertUserProjectFieldsData)
  .catch(err => err);
  
  await Promise.all([
    insertProjectInfo,
    insertUserProjectFields
  ])
  .catch(err => err);
  
  res.status(201).send({id, color});
}


/**
 * @description Update All Projects Ordinal MySQL Query
 *
 * @param {Project} projects
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function updateProjectsOrdinal(projects: Project[], res: Response): Promise<void> {
  await db.transaction(async trx => {
    await projects.forEach(async project => {
      await db(ProjectFields.Table)
      .where(ProjectFields.Id, project.id)
      .update(project)
      .transacting(trx)
      .catch(err => err);
    });
  })
  .catch(err => err);
  
  res.sendStatus(200);
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
  await db(ProjectFields.Table)
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
  const projectTableId = `${ProjectFields.Table}.${ProjectFields.Id}`;
  const UserProjectFieldsTableProjectId = `${UserProjectFields.Table}.${UserProjectFields.ProjectId}`;
  const UserProjectFieldsTableUserId = `${UserProjectFields.Table}.${UserProjectFields.UserId}`;
  
  const fetchProjects = await db(ProjectFields.Table)
  .select(ProjectFields.Id, ProjectFields.Name, ProjectFields.Color, ProjectFields.Ordinal)
  .leftJoin(UserProjectFields.Table, projectTableId, UserProjectFieldsTableProjectId)
  .whereNull(UserProjectFieldsTableUserId)
  .orWhere(UserProjectFieldsTableUserId, userId)
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
  const fetchProject = await db(ProjectFields.Table)
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
  const deleteProject = await db(ProjectFields.Table)
  .where({id})
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}