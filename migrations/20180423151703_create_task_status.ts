import * as Knex from "knex";

import { TableName, TaskStatusField } from "../shared/enums/index";
import { TaskStatus } from "../shared/interfaces/index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(TableName.TaskStatus, table => {
    table.uuid(TaskStatusField.Id).primary();
    table.string(TaskStatusField.Name, 20).notNullable();
  })
  .then(async () => {
    const statuses: TaskStatus[] = [
      { id: "11e1c71d-475b-4f2f-a14e-20c76e45aef6", name: "Open" },
      { id: "f1d24aa9-c0ec-46c2-ab11-1413e943cfad", name: "Completed" },
      { id: "a3cb5520-c18d-44ec-a7f4-2be199288741", name: "Overdue" }
    ];
  
    return await knex(TableName.TaskStatus).insert(statuses);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(TableName.TaskStatus);
}
