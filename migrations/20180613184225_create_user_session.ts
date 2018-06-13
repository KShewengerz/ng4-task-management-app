import * as Knex from "knex";

import { User, UserSession } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(UserSession.Table, table => {
    table.increments(UserSession.Id);
    table.specificType(UserSession.SessionId, "char(40)").notNullable();
    table.uuid(UserSession.UserId).notNullable();
    table.boolean(UserSession.isLoggedOut).defaultTo(false);
    
    table.foreign(UserSession.UserId)
    .references(`${User.Table}.${User.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(UserSession.Table);
}
