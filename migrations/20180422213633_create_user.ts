import * as Knex from "knex";


export async function up(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.createTable("user", table => {
    table.uuid("id").primary();
    table.string("first_mame", 128).notNullable();
    table.string("middle_name", 128).notNullable();
    table.string("email_address", 255).notNullable();
    table.string("username", 32).notNullable();
    table.string("password", 40).notNullable();
    table.enum("gender", [ "m", "f" ]).notNullable();
    table.specificType("profile_image", "longblob");
  });
}

export async function down(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.dropTable("user");
}
