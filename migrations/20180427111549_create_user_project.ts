import * as Knex from "knex";

import { User, Project, UserProject } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(UserProject.Table, table => {
    table.uuid(UserProject.UserId).notNullable();
    table.uuid(UserProject.ProjectId).notNullable();
    
    table.foreign(UserProject.UserId)
    .references(`${User.Table}.${User.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    
    table.foreign(UserProject.ProjectId)
    .references(`${Project.Table}.${Project.Id}`)
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(UserProject.Table);
}
