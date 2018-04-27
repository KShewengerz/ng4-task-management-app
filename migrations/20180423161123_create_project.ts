import * as Knex from "knex";

import { Project, TableName, ProjectField, UserField } from "../shared/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TableName.Project, table => {
    table.uuid(ProjectField.Id).primary();
    table.uuid(ProjectField.UserId).unique();
    table.integer(ProjectField.Ordinal).unique().notNullable();
    table.string(ProjectField.Name, 45).notNullable();
    table.string(ProjectField.Color, 45).notNullable();
    
    table.foreign(ProjectField.UserId).references(`${TableName.User}.${UserField.Id}`);
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
  
    return await knex(TableName.Project).insert(projects);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TableName.Project);
}
