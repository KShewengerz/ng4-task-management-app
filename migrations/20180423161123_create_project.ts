import * as Knex from "knex";


export async function up(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.createTable("project", table => {
    table.uuid("id").primary();
    table.integer("ordinal").unique().notNullable();
    table.string("name", 45).notNullable();
    table.string("color", 45).notNullable();
  })
  .then(async () => {
    const projects = [
      {
        id: "a51527b4-ef26-4dc3-aafb-eb9358f51b69",
        ordinal: 1,
        name: "Personal",
        color: "#fb876d"
      },
      {
        id: "d8ad443d-36fe-4fed-a246-15a4d578ccf1",
        ordinal: 2,
        name: "Work",
        color: "#a8c9e4"
      },
      {
        id: "2ec19746-9e1c-45a3-85f6-878d248c4e94",
        ordinal: 3,
        name: "Errands",
        color: "#e3a8e4"
      }
    ];
    
    return await knex("project").insert(projects);
  });
}

export async function down(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.dropTable("project");
}
