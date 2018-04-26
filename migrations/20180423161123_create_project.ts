import * as Knex from "knex";

import { Project, Table, ProjectFields } from "../shared/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(Table.Project, table => {
    table.uuid(ProjectFields.Id).primary();
    table.integer(ProjectFields.Ordinal).unique().notNullable();
    table.string(ProjectFields.Name, 45).notNullable();
    table.string(ProjectFields.Color, 45).notNullable();
  })
  .then(async () => {
    const projects: Project[] = [
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
  
    return await knex(Table.Project).insert(projects);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(Table.Project);
}
