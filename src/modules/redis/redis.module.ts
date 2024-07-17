import { Module, Global } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

@Global()
@Module({
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: async (configService: ConfigService) => {
        const redis = new Redis({
          host: configService.get<string>("REDIS_HOST"),
          port: configService.get<number>("REDIS_PORT"),
          password: configService.get<string>("REDIS_PASSWORD"),
        });
        console.log(`Connecting to Redis at`);
        if (!redis) {
          console.log("No password provided for Redis.");
        }
        return redis;
      },
      inject: [ConfigService],
    },
  ],
  exports: ["REDIS_CLIENT"],
})
export class RedisModule {}
