import * as Knex from "knex";


export async function up(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.createTable("task", table => {
    table.uuid("id").primary();
    table.uuid("project_id").unique().notNullable();
    table.uuid("status_id").unique().notNullable();
    table.string("description", 255).notNullable();
    table.dateTime("schedule_date").notNullable();
    
    table.foreign("project_id").references("project.id");
    table.foreign("status_id").references("task_status.id");
  });
}

export async function down(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.dropTable("task");
}
