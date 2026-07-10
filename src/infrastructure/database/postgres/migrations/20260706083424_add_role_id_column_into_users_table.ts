import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table
      .bigInteger("role_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("roles")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.dropForeign(["role_id"]);
    table.dropColumn("role_id");
  });
}