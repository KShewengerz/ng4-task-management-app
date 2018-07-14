import * as Knex from "knex";

import { TaskStatusFields } from "../shared/enums/-index";
import { TaskStatus } from "../shared/interfaces/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TaskStatusFields.Table, table => {
    table.integer(TaskStatusFields.Id).primary();
    table.string(TaskStatusFields.Name, 20).notNullable();
  })
  .then(async () => {
    const statuses: TaskStatus[] = [
      { id: 0, name: "Open" },
      { id: 1, name: "Completed" },
      { id: 2, name: "Overdue" }
    ];
  
    return await knex(TaskStatusFields.Table).insert(statuses);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TaskStatusFields.Table);
}
