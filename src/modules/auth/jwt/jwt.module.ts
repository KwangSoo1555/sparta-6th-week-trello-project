import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";   
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserAuthModule } from "../user-auth/user-auth.module";

import { ConfigService } from "@nestjs/config";

import { JwtController } from "./jwt.controller";
import { JwtService } from "./jwt.service";
import { JwtStrategyService } from "./jwt-strategy.service";

import { RefreshTokensEntity } from "src/entities/refresh-tokens.entity";
import { ENV } from "src/common/constants/env.constant";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    NestJwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        secret: configService.get<string>(ENV.ACCESS_TOKEN_SECRET),
      }),
      inject: [ConfigService],
    }),
    NestTypeOrmModule.forFeature([RefreshTokensEntity]),
    forwardRef(() => UserAuthModule),
  ],
  controllers: [JwtController],
  providers: [JwtService, JwtStrategyService],
})
export class JwtModule {}
