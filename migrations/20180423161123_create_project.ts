import * as Knex from "knex";

import { Project } from "../shared/interfaces/project";
import { projectTable, projectFields } from "../shared/constants/db-table-fields/index";


export async function up(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.createTable(projectTable, table => {
    table.uuid(projectFields.Id).primary();
    table.integer(projectFields.Ordinal).unique().notNullable();
    table.string(projectFields.Name, 45).notNullable();
    table.string(projectFields.Color, 45).notNullable();
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
  
    return await knex(projectTable).insert(projects);
  });
}

export async function down(knex: Knex, Promise: Promise<any>) {
  return await knex.schema.dropTable(projectTable);
}
