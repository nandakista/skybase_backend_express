import { createClient } from "redis";
import { env } from "../../../config/env";

const client = createClient({
  url: env.REDIS_URL ?? `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
  password: env.REDIS_PASSWORD,
});

client.on("error", (error) => {
  console.error("Redis Client Error", error);
});

let connected = false;

export async function connectRedis(): Promise<void> {
  if (!connected) {
    await client.connect();
    connected = true;
  }
}

export { client as redisClient };
