import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`
    TRUNCATE TABLE platforms
    RESTART IDENTITY CASCADE
  `);

  await knex("platforms").insert([
    {
      id: 1,
      code: "mobile",
      name: "Mobile App",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 2,
      code: "cms",
      name: "CMS",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 3,
      code: "public",
      name: "Public API",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  ]);
}
