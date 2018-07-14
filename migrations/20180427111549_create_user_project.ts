import * as Knex from "knex";

import { UserFields, ProjectFields, UserProjectFields } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(UserProjectFields.Table, table => {
    table.uuid(UserProjectFields.UserId).notNullable();
    table.uuid(UserProjectFields.ProjectId).notNullable();
    
    table.foreign(UserProjectFields.UserId)
    .references(`${UserFields.Table}.${UserFields.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    
    table.foreign(UserProjectFields.ProjectId)
    .references(`${ProjectFields.Table}.${ProjectFields.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(UserProjectFields.Table);
}
