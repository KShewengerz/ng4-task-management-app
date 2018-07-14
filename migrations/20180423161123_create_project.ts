import * as Knex from "knex";

import { ProjectFields } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(ProjectFields.Table, table => {
    table.uuid(ProjectFields.Id).primary();
    table.string(ProjectFields.Name, 45).notNullable();
    table.string(ProjectFields.Color, 45).notNullable();
    table.integer(ProjectFields.Ordinal).notNullable();
  })
  .then(async () => {
    const ProjectFieldss = [
      {
        [ProjectFields.Id]     : "a51527b4-ef26-4dc3-aafb-eb9358f51b69",
        [ProjectFields.Name]   : "Personal",
        [ProjectFields.Color]  : "#fb876d",
        [ProjectFields.Ordinal]: 1
      },
      {
        [ProjectFields.Id]      : "d8ad443d-36fe-4fed-a246-15a4d578ccf1",
        [ProjectFields.Name]    : "Work",
        [ProjectFields.Color]   : "#a8c9e4",
        [ProjectFields.Ordinal] : 2
      },
      {
        [ProjectFields.Id]      : "2ec19746-9e1c-45a3-85f6-878d248c4e94",
        [ProjectFields.Name]    : "Errands",
        [ProjectFields.Color]   : "#e3a8e4",
        [ProjectFields.Ordinal] : 3
      }
    ];
  
    return await knex(ProjectFields.Table).insert(ProjectFieldss);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(ProjectFields.Table);
}
