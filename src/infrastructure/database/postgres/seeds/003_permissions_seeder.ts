import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("permissions").del();

  await knex("permissions").insert([
    {
      module: "users",
      action: "read",
      name: "users.read",
    },
    {
      module: "users",
      action: "create",
      name: "users.create",
    },
    {
      module: "users",
      action: "update",
      name: "users.update",
    },
    {
      module: "users",
      action: "delete",
      name: "users.delete",
    },

    // Roles
    {
      module: "roles",
      action: "read",
      name: "roles.read",
    },
    {
      module: "roles",
      action: "create",
      name: "roles.create",
    },
    {
      module: "roles",
      action: "update",
      name: "roles.update",
    },
    {
      module: "roles",
      action: "delete",
      name: "roles.delete",
    },
  ]);
}
