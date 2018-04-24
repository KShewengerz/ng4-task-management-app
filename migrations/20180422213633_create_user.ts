import * as Knex from "knex";

import { userTable, userFields } from "../constants/db-table-fields/index";


export async function up(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.createTable(userTable, table => {
    table.uuid(userFields.Id).primary();
    table.string(userFields.FirstName, 128).notNullable();
    table.string(userFields.LastName, 128).notNullable();
    table.string(userFields.EmailAddress, 255).notNullable();
    table.string(userFields.Username, 32).notNullable();
    table.string(userFields.Password, 40).notNullable();
    table.enum(userFields.Gender, [ "m", "f" ]).notNullable();
    table.specificType(userFields.ProfileImage, "longblob");
  });
}

export async function down(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.dropTable(userTable);
}
