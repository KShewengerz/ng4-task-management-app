import * as Knex from "knex";

import { Project } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(Project.Table, table => {
    table.uuid(Project.Id).primary();
    table.string(Project.Name, 45).notNullable();
    table.string(Project.Color, 45).notNullable();
    table.integer(Project.Ordinal).notNullable();
  })
  .then(async () => {
    const projects = [
      {
        [Project.Id]     : "a51527b4-ef26-4dc3-aafb-eb9358f51b69",
        [Project.Name]   : "Personal",
        [Project.Color]  : "#fb876d",
        [Project.Ordinal]: 1
      },
      {
        [Project.Id]      : "d8ad443d-36fe-4fed-a246-15a4d578ccf1",
        [Project.Name]    : "Work",
        [Project.Color]   : "#a8c9e4",
        [Project.Ordinal] : 2
      },
      {
        [Project.Id]      : "2ec19746-9e1c-45a3-85f6-878d248c4e94",
        [Project.Name]    : "Errands",
        [Project.Color]   : "#e3a8e4",
        [Project.Ordinal] : 3
      }
    ];
  
    return await knex(Project.Table).insert(projects);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(Project.Table);
}
