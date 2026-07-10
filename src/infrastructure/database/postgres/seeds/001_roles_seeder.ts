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
      name: "super_admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 2,
      name: "admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 3,
      name: "maintainer",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 4,
      name: "user",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 5,
      name: "guest",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  ]);
}