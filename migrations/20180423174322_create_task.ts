import * as Knex from "knex";

import { taskTable, taskFields, projectTable, projectFields, taskStatusTable, taskStatusFields } from "../shared/constants/db-table-fields/index";


export async function up(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.createTable(taskTable, table => {
    table.uuid(taskFields.Id).primary();
    table.uuid(taskFields.ProjectId).unique().notNullable();
    table.uuid(taskFields.StatusId).unique().notNullable();
    table.string(taskFields.Description, 255).notNullable();
    table.date(taskFields.ScheduleDate).notNullable();
    
    table.foreign(taskFields.ProjectId).references(`${projectTable}.${projectFields.Id}`);
    table.foreign(taskFields.StatusId).references(`${taskStatusTable}.${taskStatusFields.Id}`);
  });
}

export async function down(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.dropTable(taskTable);
}
