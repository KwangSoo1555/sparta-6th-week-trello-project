import { ENV } from "src/common/constants/env.constant";
import { createClient } from "redis";

const dotenv = require("dotenv");
const redis = require("redis");

dotenv.config(); // env환경변수 파일 가져오기

//* Redis 연결
// redis[s]://[[username][:password]@][host][:port][/db-number]
const redisClient = redis.createClient({
  url: `redis://${ENV.REDIS_USERNAME}:${ENV.REDIS_PASSWORD}@${ENV.REDIS_HOST}:${ENV.REDIS_PORT}/0`,
  legacyMode: true, //레거시 모드가 기능하도록 설정.
});
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4;
