import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { Client, Transport } from "@nestjs/microservices";
import { MicroserviceOptions } from "@nestjs/microservices";
import { ENV } from "src/common/constants/env.constant";
import { Inject, Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { ClientProxy } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ENV.REDIS_DBNAME,
        transport: Transport.REDIS,
        options: {
          host: ENV.REDIS_HOST,
          port: Number(ENV.REDIS_PORT),
        },
      },
    ]),
  ],
})
export class RedisModule {
  constructor(@Inject("Redis_Service") private client: ClientProxy) {}
}
