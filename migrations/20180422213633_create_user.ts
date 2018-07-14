import * as Knex from "knex";

import { UserFields } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(UserFields.Table, table => {
    table.uuid(UserFields.Id).primary();
    table.string(UserFields.FirstName, 128).notNullable();
    table.string(UserFields.LastName, 128).notNullable();
    table.string(UserFields.EmailAddress, 255).notNullable();
    table.string(UserFields.Username, 32).notNullable();
    table.specificType(UserFields.Password, "char(76)").notNullable();
    table.enum(UserFields.Gender, ["m", "f"]).notNullable();
    table.specificType(UserFields.ProfileImage, "longblob");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(UserFields.Table);
}
