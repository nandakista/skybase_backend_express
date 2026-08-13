import { snowflakeClient } from "./snowflake.client";

async function main() {
  try {
    const result = await snowflakeClient.query(`
      SELECT
        CURRENT_USER() AS USER,
        CURRENT_DATABASE() AS DATABASE,
        CURRENT_SCHEMA() AS SCHEMA,
        CURRENT_ROLE() AS ROLE,
        CURRENT_WAREHOUSE() AS WAREHOUSE
    `);

    console.log("Snowflake connection successful");
    console.table(result);
  } catch (error) {
    console.error("Snowflake connection failed");
    console.error(error);
  } finally {
    await snowflakeClient.disconnect();
  }
}

main();