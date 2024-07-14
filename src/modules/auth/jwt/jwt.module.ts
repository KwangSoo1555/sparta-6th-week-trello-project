import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy, RefreshTokenStrategy } from "src/modules/auth/jwt/jwt-strategy.service";

import { UserAuthModule } from "src/modules/auth/users-auth/user-auth.module";

import { ConfigService } from "@nestjs/config";

import { JwtService } from "src/modules/auth/jwt/jwt.service";
import { JwtController } from "src/modules/auth/jwt/jwt.controller";

import { RefreshTokensEntity } from "src/entities/refresh-tokens.entity";

@Module({
  imports: [
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
