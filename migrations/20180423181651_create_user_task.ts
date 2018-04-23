import * as Knex from "knex";


export async function up(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.createTable("user_task", table => {
    table.uuid("id").primary();
    table.uuid("user_id").unique().notNullable();
    table.uuid("task_id").unique().notNullable();
    
    table.foreign("user_id")
    .references("user.id")
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    
    table.foreign("task_id")
    .references("task.id")
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.dropTable("user_task");
}
