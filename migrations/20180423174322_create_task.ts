import * as Knex from "knex";

import { Project, Task, TaskStatus } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(Task.Table, table => {
    table.uuid(Task.Id).primary();
    table.uuid(Task.ProjectId).nullable();
    table.uuid(Task.StatusId).notNullable();
    table.string(Task.Description, 255).notNullable();
    table.string(Task.ScheduleDate).nullable();
    table.integer(Task.Ordinal).notNullable();
    
    table.foreign(Task.ProjectId).references(`${Project.Table}.${Project.Id}`);
    table.foreign(Task.StatusId).references(`${TaskStatus.Table}.${TaskStatus.Id}`);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(Task.Table);
}
