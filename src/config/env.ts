import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const JwtExpiresSchema = z.enum([
  "24h",
  "7d",
  "30d",
]);

const configSchema = z.object({
  app: z.object({
    port: z.coerce.number().default(3000),
    env: z
      .enum(["development", "production", "test"])
      .default("development"),
    logLevel: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace"])
      .default("info"),
  }),

  database: z.object({
    host: z.string(),
    port: z.coerce.number().default(5432),
    name: z.string(),
    user: z.string(),
    password: z.string(),
  }),

  redis: z.object({
    host: z.string().default("localhost"),
    port: z.coerce.number().default(6379),
    password: z.string().optional(),
    url: z.string().optional(),
  }),

  snowflake: z.object({
    account: z.string(),
    username: z.string(),
    warehouse: z.string(),
    database: z.string(),
    schema: z.string(),
    role: z.string(),
    privateKeyPath: z.string(),
  }),

  security: z.object({
    cacheEncryptionKey: z
      .string()
      .min(32, 'Cache encryption key must be at least 32 characters'),
    jwtSecret: z
      .string()
      .min(32, "JWT_SECRET minimal 32 karakter"),
    jwtExpiresIn: JwtExpiresSchema.default("24h"),
  }),
});

export type Config = z.infer<typeof configSchema>;

function loadConfig(): Config {
  const rawConfig = {
    app: {
      port: process.env.APP_PORT,
      env: process.env.NODE_ENV,
      logLevel: process.env.LOG_LEVEL,
    },

    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },

    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      url: process.env.REDIS_URL,
    },

    security: {
      cacheEncryptionKey: process.env.CACHE_ENCRYPTION_KEY,
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    },

     snowflake: {
      account: process.env.SNOWFLAKE_ACCOUNT,
      username: process.env.SNOWFLAKE_USERNAME,
      warehouse: process.env.SNOWFLAKE_WAREHOUSE,
      database: process.env.SNOWFLAKE_DATABASE,
      schema: process.env.SNOWFLAKE_SCHEMA,
      role: process.env.SNOWFLAKE_ROLE,
      privateKeyPath: process.env.SNOWFLAKE_PRIVATE_KEY_PATH,
    },
  };

  return configSchema.parse(rawConfig);
}

export const env = loadConfig();