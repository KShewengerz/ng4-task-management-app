import * as Knex from "knex";

import { TaskStatus as TaskStatusEnum } from "../shared/enums/-index";
import { TaskStatus } from "../shared/interfaces/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TaskStatusEnum.Table, table => {
    table.integer(TaskStatusEnum.Id).primary();
    table.string(TaskStatusEnum.Name, 20).notNullable();
  })
  .then(async () => {
    const statuses: TaskStatus[] = [
      { id: 0, name: "Open" },
      { id: 1, name: "Completed" },
      { id: 2, name: "Overdue" }
    ];
  
    return await knex(TaskStatusEnum.Table).insert(statuses);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TaskStatusEnum.Table);
}
