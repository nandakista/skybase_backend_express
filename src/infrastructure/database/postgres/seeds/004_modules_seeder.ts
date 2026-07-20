import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`
    TRUNCATE TABLE modules
    RESTART IDENTITY CASCADE
  `);

  const cmsPlatform = await knex("platforms")
    .where({ code: "cms" })
    .first();

  if (!cmsPlatform) {
    throw new Error("Platform 'cms' not found. Make sure platforms are seeded first.");
  }

  await knex("modules").insert([
    {
      id: 1,
      platform_id: cmsPlatform.id,
      name: "users",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 2,
      platform_id: cmsPlatform.id,
      name: "roles",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  ]);
}
