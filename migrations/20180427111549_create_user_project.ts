import * as Knex from "knex";

import { TableName, UserProjectField, UserField, ProjectField } from "../shared/enums/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TableName.UserProject, table => {
    table.uuid(UserProjectField.UserId).unique();
    table.uuid(UserProjectField.ProjectId).unique().notNullable();
    
    table.foreign(UserProjectField.UserId)
    .references(`${TableName.User}.${UserField.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    
    table.foreign(UserProjectField.ProjectId)
    .references(`${TableName.Project}.${ProjectField.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TableName.UserProject);
}
