import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("platform_modules", (table) => {
    table.bigIncrements("id").primary();

    table
      .bigInteger("platform_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("platforms")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .bigInteger("module_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("modules")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.timestamps(true, true);

    table.unique(["platform_id", "module_id"]);

    table.index(["platform_id"]);
    table.index(["module_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("platform_modules");
}