import * as Knex from "knex";

import { User } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(User.Table, table => {
    table.uuid(User.Id).primary();
    table.string(User.FirstName, 128).notNullable();
    table.string(User.LastName, 128).notNullable();
    table.string(User.EmailAddress, 255).notNullable();
    table.string(User.Username, 32).notNullable();
    table.specificType(User.Password, "char(76)").notNullable();
    table.enum(User.Gender, ["m", "f"]).notNullable();
    table.specificType(User.ProfileImage, "longblob");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(User.Table);
}
