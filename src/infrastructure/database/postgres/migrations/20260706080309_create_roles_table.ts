import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("roles", (table) => {
    table.bigIncrements("id").primary();

    table.string("code", 50).notNullable().unique();

    table.string("name", 150).notNullable().unique();

    table.timestamps(true, true);

    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("roles");
}