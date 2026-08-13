import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`
    TRUNCATE TABLE platform_modules
    RESTART IDENTITY CASCADE
  `);

  const platforms = await knex("platforms")
    .select("id", "code");

  const modules = await knex("modules")
    .select("id", "code");

  const platformMap = Object.fromEntries(
    platforms.map((platform) => [platform.code, platform.id]),
  );

  const moduleMap = Object.fromEntries(
    modules.map((module) => [module.code, module.id]),
  );

  await knex("platform_modules").insert([
    // CMS
    {
      platform_id: platformMap.cms,
      module_id: moduleMap.users,
    },
    {
      platform_id: platformMap.cms,
      module_id: moduleMap.roles,
    },

    // Mobile
    {
      platform_id: platformMap.mobile,
      module_id: moduleMap.users,
    },
  ]);
}