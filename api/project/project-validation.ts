"use strict";

import * as snakeCase from "snakecase-keys";
import * as dbConnection from "../../config/db";

import { TableName, ProjectField, UserProjectField, Project } from "../../shared/index";

const db = dbConnection.default;
const projectTable = TableName.Project;
const userProjectTable = TableName.UserProject;


export async function getNextUserProjectOrdinal(userId: string): Promise<number> {
  const projectTableId = `${projectTable}.${ProjectField.Id}`;
  const userProjectTableProjectId = `${userProjectTable}.${UserProjectField.ProjectId}`;
  const userProjectTableUserId = `${userProjectTable}.${UserProjectField.UserId}`;
  
  const fetchNextOrdinal = await db(userProjectTable)
  .max({max: ProjectField.Ordinal})
  .innerJoin(projectTable, projectTableId, userProjectTableProjectId)
  .where(userProjectTableUserId, userId)
  .then(response => {
    const max = response[0].max;
    
    if (max > 1) return max + 1;
    else return 4;
  });
  
  return fetchNextOrdinal;
}