import * as Knex from "knex";

import { ProjectFields, TaskFields, TaskStatusFields } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TaskFields.Table, table => {
    table.uuid(TaskFields.Id).primary();
    table.uuid(TaskFields.ProjectId).nullable();
    table.integer(TaskFields.StatusId).notNullable();
    table.string(TaskFields.Description, 255).notNullable();
    table.string(TaskFields.ScheduleDate).nullable();
    table.integer(TaskFields.Ordinal).notNullable();
    
    table.foreign(TaskFields.ProjectId).references(`${ProjectFields.Table}.${ProjectFields.Id}`);
    table.foreign(TaskFields.StatusId).references(`${TaskStatusFields.Table}.${TaskStatusFields.Id}`);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TaskFields.Table);
}
