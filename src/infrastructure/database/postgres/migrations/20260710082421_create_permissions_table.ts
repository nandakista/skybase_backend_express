import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("permissions", (table) => {
        table.bigIncrements("id").primary();

        table.bigInteger("platform_module_id").unsigned().notNullable().first();
        table.foreign("platform_module_id")
            .references("platform_modules.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        table.string("action", 50).notNullable();

        table.string("name", 150).notNullable().unique();

        table.timestamps(true, true);

        table.timestamp("deleted_at").nullable();

        table.unique(["platform_module_id", "action"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("permissions");
}

