import snowflake from 'snowflake-sdk';
import { env } from "../../config/env";


export const snowflakeConnection = snowflake.createConnection({
  account: env.snowflake.account,
  username: env.snowflake.username,

  authenticator: "SNOWFLAKE_JWT",
  privateKeyPath: env.snowflake.privateKeyPath,

  warehouse: env.snowflake.warehouse,
  database: env.snowflake.database,
  schema: env.snowflake.schema,
  role: env.snowflake.role,

  application: "CLOSIO_SNOWFLAKE_SERVICE",
});
