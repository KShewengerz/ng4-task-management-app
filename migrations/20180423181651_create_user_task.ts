import * as Knex from "knex";

import { TableName, UserTaskField, UserField, TaskField } from "../shared/enums/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TableName.UserTask, table => {
    table.uuid(UserTaskField.UserId).unique().notNullable();
    table.uuid(UserTaskField.TaskId).unique().notNullable();
    
    table.foreign(UserTaskField.UserId)
    .references(`${TableName.User}.${UserField.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    
    table.foreign(UserTaskField.TaskId)
    .references(`${TableName.Task}.${TaskField.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TableName.UserTask);
}
