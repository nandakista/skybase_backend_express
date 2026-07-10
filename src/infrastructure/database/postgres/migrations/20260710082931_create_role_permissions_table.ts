import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("role_permissions", (table) => {
        table.bigInteger("role_id")
            .unsigned()
            .notNullable();

        table.bigInteger("permission_id")
            .unsigned()
            .notNullable();

        table.foreign("role_id")
            .references("roles.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        table.foreign("permission_id")
            .references("permissions.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        table.primary([
            "role_id",
            "permission_id"
        ]);

        table.timestamp("created_at")
            .defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("role_permissions");
}

