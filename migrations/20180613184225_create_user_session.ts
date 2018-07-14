import * as Knex from "knex";

import { UserFields, UserSessionFields } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(UserSessionFields.Table, table => {
    table.increments(UserSessionFields.Id);
    table.specificType(UserSessionFields.SessionId, "char(40)").notNullable();
    table.uuid(UserSessionFields.UserId).notNullable();
    table.boolean(UserSessionFields.isLoggedOut).defaultTo(false);
    
    table.foreign(UserSessionFields.UserId)
    .references(`${UserFields.Table}.${UserFields.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(UserSessionFields.Table);
}
