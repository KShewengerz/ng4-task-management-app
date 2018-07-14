import * as Knex from "knex";

import { UserFields, UserTaskFields, TaskFields } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(UserTaskFields.Table, table => {
    table.uuid(UserTaskFields.UserId).notNullable();
    table.uuid(UserTaskFields.TaskId).unique().notNullable();
    
    table.foreign(UserTaskFields.UserId)
    .references(`${UserFields.Table}.${UserFields.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    
    table.foreign(UserTaskFields.TaskId)
    .references(`${TaskFields.Table}.${TaskFields.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(UserTaskFields.Table);
}
