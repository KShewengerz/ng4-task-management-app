import * as Knex from "knex";

import { TableName, UserProjectField, UserField, ProjectField } from "../shared/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TableName.UserProject, table => {
    table.uuid(UserProjectField.UserId).unique();
    table.uuid(UserProjectField.ProjectId).unique().notNullable();
    table.integer(UserProjectField.Ordinal).unique().notNullable();
    
    table.foreign(UserProjectField.UserId)
    .references(`${TableName.User}.${UserField.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    
    table.foreign(UserProjectField.ProjectId)
    .references(`${TableName.Project}.${ProjectField.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  })
  .then(async () => {
    const projectOrdinal = [
      {
        [UserProjectField.ProjectId]: "a51527b4-ef26-4dc3-aafb-eb9358f51b69",
        [UserProjectField.Ordinal]: 1
      },
      {
        [UserProjectField.ProjectId]: "d8ad443d-36fe-4fed-a246-15a4d578ccf1",
        [UserProjectField.Ordinal]: 2
      },
      {
        [UserProjectField.ProjectId]: "2ec19746-9e1c-45a3-85f6-878d248c4e94",
        [UserProjectField.Ordinal]: 3
      }
    ];
  
    return await knex(TableName.UserProject).insert(projectOrdinal);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TableName.UserProject);
}
