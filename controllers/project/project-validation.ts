"use strict";

import * as dbConnection from "../../config/db";

import { Project } from "../../shared/interfaces/-index";
import { ProjectFields, UserProjectFields, HttpVerb } from "../../shared/enums/-index";

const db = dbConnection.default;


/**
 * @description Get Next User Project Ordinal Number
 *
 * @param {String} userId
 *
 * @returns {Promise<number>}
 */
export async function getNextUserProjectOrdinal(userId: string): Promise<number> {
  const fetchNextOrdinal = await db(UserProjectFields.Table)
  .max({ max: ProjectFields.Ordinal })
  .innerJoin(ProjectFields.Table, ProjectFields.Id, UserProjectFields.ProjectId)
  .where(UserProjectFields.UserId, userId)
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
  const isProjectExists = await getBodyValidation(userId, ProjectFields.Id, body.id);
  const isProjectNameExists = await getBodyValidation(userId, ProjectFields.Name, body.name);
  
  return { isProjectExists, isProjectNameExists };
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
  const isProjectExists = await getBodyValidation(userId, ProjectFields.Id, projectId);
  const isProjectNameExists = await putBodyValidationMethod(userId, ProjectFields.Name, body.name, projectId);
  const isProjectColorExists = await putBodyValidationMethod(userId, ProjectFields.Color, body.color, projectId);
  
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
  const query = `${field} = '${value}' AND (${UserProjectFields.UserId} = '${userId}' or ${UserProjectFields.UserId} is null)`;
  
  const isRecordExists = await db(ProjectFields.Table)
  .count({ id: ProjectFields.Id })
  .leftJoin(UserProjectFields.Table, ProjectFields.Id, UserProjectFields.ProjectId)
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
  const query = db(UserProjectFields.Table).whereRaw(`(${field} = '${value}' AND NOT ${ProjectFields.Id} = '${projectId}')
  AND ${UserProjectFields.UserId} = '${userId}'`);
  
  const isRecordExists = await db(ProjectFields.Table)
  .count({ id: ProjectFields.Id })
  .whereExists(query)
  .then(response => response[0].id)
  .catch(err => err);
  
  return isRecordExists;
}
