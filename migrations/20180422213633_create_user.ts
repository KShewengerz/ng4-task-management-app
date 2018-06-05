import * as Knex from "knex";

import { TableName, UserField } from "../shared/enums/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TableName.User, table => {
    table.uuid(UserField.Id).primary();
    table.string(UserField.FirstName, 128).notNullable();
    table.string(UserField.LastName, 128).notNullable();
    table.string(UserField.EmailAddress, 255).notNullable();
    table.string(UserField.Username, 32).notNullable();
    table.specificType(UserField.Password, "char(76)").notNullable();
    table.enum(UserField.Gender, ["m", "f"]).notNullable();
    table.specificType(UserField.ProfileImage, "longblob");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TableName.User);
}
