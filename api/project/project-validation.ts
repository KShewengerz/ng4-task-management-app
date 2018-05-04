"use strict";

import * as dbConnection from "../../config/db";

import { Project } from "../../shared/interfaces/index";
import { TableName, ProjectField, UserProjectField, HttpVerb } from "../../shared/enums/index";

const db = dbConnection.default;
const { Project: projectTable, UserProject: userProjectTable } = TableName;

//Temporary: TODO Create API Authentication
const userId = "fed78975-307f-44fa-8700-b5b52273d813 ";


/**
 * @description Get Next User Project Ordinal Number
 *
 * @param {String} userId
 *
 * @returns {Promise<number>}
 */
export async function getNextUserProjectOrdinal(userId: string): Promise<number> {
  const fetchNextOrdinal = await db(userProjectTable)
  .max({ max: ProjectField.Ordinal })
  .innerJoin(projectTable, ProjectField.Id, UserProjectField.ProjectId)
  .where(UserProjectField.UserId, userId)
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
export async function getPostBodyValidation(body: Project): Promise<any> {
  const isProjectExists = await getBodyValidation(ProjectField.Id, body.id);
  const isProjectNameExists = await getBodyValidation(ProjectField.Name, body.name);
  const isProjectColorExists = await getBodyValidation(ProjectField.Color, body.color);
  
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
export async function getPutBodyValidation(body: Project, projectId: string): Promise<any> {
  const isProjectExists = await getBodyValidation(ProjectField.Id, projectId);
  const isProjectNameExists = await putBodyValidationMethod(ProjectField.Name, body.name, projectId);
  const isProjectColorExists = await putBodyValidationMethod(ProjectField.Color, body.color, projectId);
  
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
export async function getBodyValidation(field: string, value: any): Promise<any> {
  const query = `${field} = '${value}' AND (${UserProjectField.UserId} = '${userId}' or ${UserProjectField.UserId} is null)`;
  
  const isRecordExists = await db(projectTable)
  .count({ id: ProjectField.Id })
  .leftJoin(userProjectTable, ProjectField.Id, UserProjectField.ProjectId)
  .whereRaw(query)
  .then(response => response[0].id)
  .catch(err => err);

  return isRecordExists;
}


/**
 * @description A method to validate PUT request with its supplied fields if its value is duplicate within its own project excluding project
 * with same id and name
 *
 * @param {string} field
 * @param value
 *
 * @returns {Promise<any>}
 */
async function putBodyValidationMethod(field: string, value: any, projectId: string) {
  const query = db(userProjectTable).whereRaw(`(${field} = '${value}' AND NOT ${ProjectField.Id} = '${projectId}')
  AND ${UserProjectField.UserId} = '${userId}'`);
  
  const isRecordExists = await db(projectTable)
  .count({ id: ProjectField.Id })
  .whereExists(query)
  .then(response => response[0].id)
  .catch(err => err);
  
  return isRecordExists;
}
