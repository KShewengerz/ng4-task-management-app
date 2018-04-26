import * as Knex from "knex";

import { Table, UserTaskFields, UserFields, TaskFields } from "../shared/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(Table.UserTask, table => {
    table.uuid(UserTaskFields.UserId).unique().notNullable();
    table.uuid(UserTaskFields.TaskId).unique().notNullable();
    
    table.foreign(UserTaskFields.UserId)
    .references(`${Table.User}.${UserFields.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    
    table.foreign(UserTaskFields.TaskId)
    .references(`${Table.Task}.${TaskFields.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(Table.UserTask);
}
