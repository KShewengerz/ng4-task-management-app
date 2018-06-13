import * as Knex from "knex";

import { User, UserSession } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(UserSession.Table, table => {
    table.string(UserSession.Id).notNullable();
    table.uuid(UserSession.UserId).notNullable();
    
    table.foreign(UserSession.UserId)
    .references(`${User.Table}.${User.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(UserSession.Table);
}
