import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`
    TRUNCATE TABLE permissions
    RESTART IDENTITY CASCADE
  `);

  const usersModule = await knex("modules")
    .where({ name: "users" })
    .first("id");

  const rolesModule = await knex("modules")
    .where({ name: "roles" })
    .first("id");

  if (!usersModule || !rolesModule) {
    throw new Error("Module records not found. Make sure modules are seeded before permissions.");
  }

  await knex("permissions").insert([
    {
      module_id: usersModule.id,
      action: "read",
      name: "users.read",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      module_id: usersModule.id,
      action: "create",
      name: "users.create",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      module_id: usersModule.id,
      action: "update",
      name: "users.update",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      module_id: usersModule.id,
      action: "delete",
      name: "users.delete",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },

    {
      module_id: rolesModule.id,
      action: "read",
      name: "roles.read",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      module_id: rolesModule.id,
      action: "create",
      name: "roles.create",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      module_id: rolesModule.id,
      action: "update",
      name: "roles.update",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      module_id: rolesModule.id,
      action: "delete",
      name: "roles.delete",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  ]);
}
