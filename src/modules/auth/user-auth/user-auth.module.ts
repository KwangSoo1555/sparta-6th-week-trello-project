import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";
import { EmailVerificationModule } from "../email/email-verification.module";
import { JwtModule } from "../jwt/jwt.module";

import { UserAuthService } from "./user-auth.service";
import { UserAuthController } from "./user-auth.controller";

import { JwtStrategyService } from "../jwt/jwt-strategy.service";

import { UsersEntity } from "src/entities/users.entity";
import { RefreshTokensEntity } from "src/entities/refresh-tokens.entity";

@Module({
  imports: [
    NestTypeOrmModule.forFeature([UsersEntity, RefreshTokensEntity]),
    EmailVerificationModule,
    forwardRef(() => JwtModule),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtStrategyService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
