import * as Knex from "knex";

import { Table, TaskFields, ProjectFields, TaskStatusFields } from "../shared/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(Table.Task, table => {
    table.uuid(TaskFields.Id).primary();
    table.uuid(TaskFields.ProjectId).unique().notNullable();
    table.uuid(TaskFields.StatusId).unique().notNullable();
    table.string(TaskFields.Description, 255).notNullable();
    table.date(TaskFields.ScheduleDate).notNullable();
    
    table.foreign(TaskFields.ProjectId).references(`${Table.Project}.${ProjectFields.Id}`);
    table.foreign(TaskFields.StatusId).references(`${Table.TaskStatus}.${TaskStatusFields.Id}`);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(Table.Task);
}
