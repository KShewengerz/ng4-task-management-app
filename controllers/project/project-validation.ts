"use strict";

import * as dbConnection from "../../config/db";

import { Project } from "../../shared/interfaces/-index";
import { Project as ProjectEnum, UserProject, HttpVerb } from "../../shared/enums/-index";

const db = dbConnection.default;


/**
 * @description Get Next User Project Ordinal Number
 *
 * @param {String} userId
 *
 * @returns {Promise<number>}
 */
export async function getNextUserProjectOrdinal(userId: string): Promise<number> {
  const fetchNextOrdinal = await db(UserProject.Table)
  .max({ max: ProjectEnum.Ordinal })
  .innerJoin(ProjectEnum.Table, ProjectEnum.Id, UserProject.ProjectId)
  .where(UserProject.UserId, userId)
  .then(response => {
    const max = response[0].max;
    
    if (max > 1) return max + 1;
    else return 4;
  })
  .catch(err => err);
  
  return fetchNextOrdinal;
}


/**
 * @description Validates POST Body Fields if its value is duplicate within its own project.
 *
 * @param {Project} body
 *
 * @returns {Promise<any>}
 */
export async function getPostBodyValidation(userId: string, body: Project): Promise<any> {
  const isProjectExists = await getBodyValidation(userId, ProjectEnum.Id, body.id);
  const isProjectNameExists = await getBodyValidation(userId, ProjectEnum.Name, body.name);
  const isProjectColorExists = await getBodyValidation(userId, ProjectEnum.Color, body.color);
  
  return { isProjectExists, isProjectNameExists, isProjectColorExists };
}


/**
 * @description Validates PUT Body Fields if its value is duplicate within its own project.
 *
 * @param {Project} body
 * @param {string} projectId
 *
 * @returns {Promise<any>}
 */
export async function getPutBodyValidation(userId: string, body: Project, projectId: string): Promise<any> {
  const isProjectExists = await getBodyValidation(userId, ProjectEnum.Id, projectId);
  const isProjectNameExists = await putBodyValidationMethod(userId, ProjectEnum.Name, body.name, projectId);
  const isProjectColorExists = await putBodyValidationMethod(userId, ProjectEnum.Color, body.color, projectId);
  
  return { isProjectExists, isProjectNameExists, isProjectColorExists };
}


/**
 * @description A method to validate all supplied fields if its value is duplicate within its own project.
 *
 * @param {String} userId
 * @param {String} field
 * @param {any} value
 *
 * @returns {Promise<any>}
 */
export async function getBodyValidation(userId: string, field: string, value: any): Promise<any> {
  const query = `${field} = '${value}' AND (${UserProject.UserId} = '${userId}' or ${UserProject.UserId} is null)`;
  
  const isRecordExists = await db(ProjectEnum.Table)
  .count({ id: ProjectEnum.Id })
  .leftJoin(UserProject.Table, ProjectEnum.Id, UserProject.ProjectId)
  .whereRaw(query)
  .then(response => response[0].id)
  .catch(err => err);

  return isRecordExists;
}


/**
 * @description A method to validate PUT request with its supplied fields if its value is duplicate within its own project excluding project
 * with same id and name
 *
 * @param {string} userId
 * @param {string} field
 * @param value
 *
 * @returns {Promise<any>}
 */
async function putBodyValidationMethod(userId: string, field: string, value: any, projectId: string) {
  const query = db(UserProject.Table).whereRaw(`(${field} = '${value}' AND NOT ${ProjectEnum.Id} = '${projectId}')
  AND ${UserProject.UserId} = '${userId}'`);
  
  const isRecordExists = await db(ProjectEnum.Table)
  .count({ id: ProjectEnum.Id })
  .whereExists(query)
  .then(response => response[0].id)
  .catch(err => err);
  
  return isRecordExists;
}
