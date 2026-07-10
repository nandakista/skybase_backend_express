import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.bigIncrements("id").primary();

    table.string("name", 150).notNullable();

    table.string("email", 150).notNullable().unique();

    table.string("password", 255).notNullable();

    table.boolean("is_active").notNullable().defaultTo(true);

    table.timestamps(true, true);

    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}