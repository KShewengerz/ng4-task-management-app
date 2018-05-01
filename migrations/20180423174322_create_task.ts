import * as Knex from "knex";

import { TableName, TaskField, ProjectField, TaskStatusField } from "../shared/enums/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TableName.Task, table => {
    table.uuid(TaskField.Id).primary();
    table.uuid(TaskField.ProjectId).unique().notNullable();
    table.uuid(TaskField.StatusId).unique().notNullable();
    table.string(TaskField.Description, 255).notNullable();
    table.date(TaskField.ScheduleDate).notNullable();
    
    table.foreign(TaskField.ProjectId).references(`${TableName.Project}.${ProjectField.Id}`);
    table.foreign(TaskField.StatusId).references(`${TableName.TaskStatus}.${TaskStatusField.Id}`);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TableName.Task);
}
