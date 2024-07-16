import { ENV } from "src/common/constants/env.constant";

import Redis from "ioredis";

async function main() {
  try {
    const redisDB = new Redis({
      port: Number(ENV.REDIS_PORT),
      host: ENV.REDIS_HOST,
      username: ENV.REDIS_USERNAME,
      password: ENV.REDIS_PASSWORD,
      db: 0,
    });

    // 연결 확인
    await redisDB.ping();
    console.log("Redis connected successfully");
  } catch (error) {
    console.error("Redis connection error:", error);
  }
}

main();
