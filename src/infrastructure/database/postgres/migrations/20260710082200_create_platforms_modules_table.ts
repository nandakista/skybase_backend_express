import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("platforms", (table) => {
    table.bigIncrements("id").primary();
    table.string("code", 100).notNullable().unique();
    table.string("name", 150).notNullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
  });

  await knex.schema.createTable("modules", (table) => {
    table.bigIncrements("id").primary();
    table.bigInteger("platform_id").unsigned().notNullable();
    table.string("name", 100).notNullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();

    table.foreign("platform_id")
      .references("platforms.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.unique(["platform_id", "name"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("modules");
  await knex.schema.dropTableIfExists("platforms");
}
