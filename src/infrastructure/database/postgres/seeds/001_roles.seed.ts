import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // await knex("roles").del();

  // await knex.raw("ALTER SEQUENCE roles_id_seq RESTART WITH 1");

  await knex.raw(`
  TRUNCATE TABLE roles
  RESTART IDENTITY CASCADE
`);

  await knex("roles").insert([
    {
      id: 1,
      code: "super_admin",
      name: "Super Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 2,
      code: "admin",
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 3,
      code: "maintainer",
      name: "Maintainer",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 4,
      code: "user",
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 5,
      code: "guest",
      name: "Guest",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  ]);
}