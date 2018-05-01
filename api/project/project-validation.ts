"use strict";

import * as dbConnection from "../../config/db";

import { Project } from "../../shared/interfaces/index";
import { TableName, ProjectField, UserProjectField, HttpVerb } from "../../shared/enums/index";

const db = dbConnection.default;
const { Project: projectTable, UserProject: userProjectTable } = TableName;

//Temporary: TODO Create API Authentication
const userId = "72fd18d3-8403-4376-a486-05bdecc88b2a";

/**
 * @description Get Next User Project Ordinal Number
 *
 * @param {String} userId
 *
 * @returns {Promise<number>}
 */
export async function getNextUserProjectOrdinal(userId: string): Promise<number> {
  const projectTableId = `${projectTable}.${ProjectField.Id}`;
  const userProjectTableProjectId = `${userProjectTable}.${UserProjectField.ProjectId}`;
  const userProjectTableUserId = `${userProjectTable}.${UserProjectField.UserId}`;
  
  const fetchNextOrdinal = await db(userProjectTable)
  .max({ max: ProjectField.Ordinal })
  .innerJoin(projectTable, projectTableId, userProjectTableProjectId)
  .where(userProjectTableUserId, userId)
  .then(response => {
    const max = response[0].max;
    
    if (max > 1) return max + 1;
    else return 4;
  })
  .catch(err => err);
  
  return fetchNextOrdinal;
}


/**
 * @description Check if the supplied value exists within user project table.
 *
 * @param {String} userId
 * @param {String} field
 * @param {any} value
 *
 * @returns {Promise<number>}
 */
export async function checkIfValueExistsWithinUserProject({ field, value }, action?: HttpVerb): Promise<any> {
  const userProjectTableProjectId = `${userProjectTable}.${UserProjectField.ProjectId}`;
  const projectTableId = `${projectTable}.${ProjectField.Id}`;
  const userIdField = UserProjectField.UserId;
  
  const isRecordExists = await db(projectTable)
  .count({ id: ProjectField.Id })
  .leftJoin(userProjectTable, projectTableId, userProjectTableProjectId)
  .whereRaw(`${field} = '${value}' AND (${userIdField} = '${userId}' or ${userIdField} is null)`)
  .then(response => response[0].id)
  .catch(err => err);
  
  return { isRecordExists };
}


/**
 * @description Validates Body Fields if its duplicate in value within user project.
 *
 * @param {string} userId
 * @param {string} projectId
 * @param {Project} body
 *
 * @returns {Promise<any>}
 */
export async function validateDuplicateBodyFields(body: Project, projectId?: string, httpVerb?: HttpVerb): Promise<any> {
  const IdCondition = { field: ProjectField.Id, value: body.id || projectId };
  const NameCondition = { field: ProjectField.Name, value: body.name };
  const ColorCondition = { field: ProjectField.Color, value: body.color };
  
  const isProjectExists = await checkIfValueExistsWithinUserProject(IdCondition, httpVerb);
  const isProjectNameExists = await checkIfValueExistsWithinUserProject(NameCondition, httpVerb);
  const isProjectColorExists = await checkIfValueExistsWithinUserProject(ColorCondition, httpVerb);
  
  return { isProjectExists, isProjectNameExists, isProjectColorExists };
}
