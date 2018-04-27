import * as Knex from "knex";

import { TableName, ProjectField, UserField } from "../shared/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TableName.Project, table => {
    table.uuid(ProjectField.Id).primary();
    table.string(ProjectField.Name, 45).notNullable();
    table.string(ProjectField.Color, 45).notNullable();
  })
  .then(async () => {
    const projects = [
      {
        [ProjectField.Id]: "a51527b4-ef26-4dc3-aafb-eb9358f51b69",
        [ProjectField.Name]: "Personal",
        [ProjectField.Color]: "#fb876d"
      },
      {
        [ProjectField.Id]: "d8ad443d-36fe-4fed-a246-15a4d578ccf1",
        [ProjectField.Name]: "Work",
        [ProjectField.Color]: "#a8c9e4"
      },
      {
        [ProjectField.Id]: "2ec19746-9e1c-45a3-85f6-878d248c4e94",
        [ProjectField.Name]: "Errands",
        [ProjectField.Color]: "#e3a8e4"
      }
    ];
  
    return await knex(TableName.Project).insert(projects);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TableName.Project);
}
