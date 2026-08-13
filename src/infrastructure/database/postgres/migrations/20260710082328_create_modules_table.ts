import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("modules", (table) => {
    table.bigIncrements("id").primary();
    table.string("code", 50).notNullable();
    table.string("name", 100).nullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("modules");
}

