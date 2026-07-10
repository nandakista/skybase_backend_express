import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("permissions", (table) => {
        table.bigIncrements("id").primary();

        table.string("module", 100).notNullable();

        table.string("action", 50).notNullable();

        table.string("name", 150).notNullable().unique();

        table.timestamps(true, true);

        table.timestamp("deleted_at").nullable();

        table.unique(["module", "action"]);

    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("permissions");
}

