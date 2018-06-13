import * as Knex from "knex";

import { User, UserTask, Task } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(UserTask.Table, table => {
    table.uuid(UserTask.UserId).notNullable();
    table.uuid(UserTask.TaskId).unique().notNullable();
    
    table.foreign(UserTask.UserId)
    .references(`${User.Table}.${User.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    
    table.foreign(UserTask.TaskId)
    .references(`${Task.Table}.${Task.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(UserTask.Table);
}
