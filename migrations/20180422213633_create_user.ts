import * as Knex from "knex";

import { Table, UserFields } from "../shared/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(Table.User, table => {
    table.uuid(UserFields.Id).primary();
    table.string(UserFields.FirstName, 128).notNullable();
    table.string(UserFields.LastName, 128).notNullable();
    table.string(UserFields.EmailAddress, 255).notNullable();
    table.string(UserFields.Username, 32).notNullable();
    table.string(UserFields.Password, 40).notNullable();
    table.enum(UserFields.Gender, ["m", "f"]).notNullable();
    table.specificType(UserFields.ProfileImage, "longblob");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(Table.User);
}
