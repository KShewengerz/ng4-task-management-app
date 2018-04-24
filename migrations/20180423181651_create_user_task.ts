import * as Knex from "knex";

import { userTaskTable, userTaskFields, userTable, userFields, taskTable, taskFields } from "../constants/db-table-fields/index";


export async function up(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.createTable(userTaskTable, table => {
    table.uuid(userTaskFields.Id).primary();
    table.uuid(userTaskFields.UserId).unique().notNullable();
    table.uuid(userTaskFields.TaskId).unique().notNullable();
    
    table.foreign(userTaskFields.UserId)
    .references(`${userTable}.${userFields.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    
    table.foreign(userTaskFields.TaskId)
    .references(`${taskTable}.${taskFields.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.dropTable(userTaskTable);
}
