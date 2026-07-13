import dotenv from "dotenv";
dotenv.config();

export const env = {
  JWT_SECRET: process.env.JWT_SECRET || "",
  REDIS_URL: process.env.REDIS_URL || "",
  REDIS_HOST: process.env.REDIS_HOST || "",
  REDIS_PORT: process.env.REDIS_PORT || "",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
};