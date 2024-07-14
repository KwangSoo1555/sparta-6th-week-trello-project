import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AccessTokenStrategy, RefreshTokenStrategy } from "./jwt-strategy.service";

import { UserAuthModule } from "../user-auth/user-auth.module";

import { ConfigModule, ConfigService } from "@nestjs/config";

import { JwtService } from "./jwt.service";
import { JwtController } from "./jwt.controller";

import { RefreshTokensEntity } from "src/entities/refresh-tokens.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ session: false }),
    NestJwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("ACCESS_TOKEN_SECRET"),
      }),
      inject: [ConfigService],
    }),
    NestJwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("REFRESH_TOKEN_SECRET"),
      }),
      inject: [ConfigService],
    }),
    NestTypeOrmModule.forFeature([RefreshTokensEntity]),
    forwardRef(() => UserAuthModule),
  ],
  controllers: [JwtController],
  providers: [JwtService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AccessTokenStrategy, RefreshTokenStrategy],
})
export class JwtModule {}
