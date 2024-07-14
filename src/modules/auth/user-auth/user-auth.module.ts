import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";
import { EmailVerificationModule } from "../email/email-verification.module";
import { JwtModule } from "../jwt/jwt.module";

import { UserAuthService } from "./user-auth.service";
import { UserAuthController } from "./user-auth.controller";

import { JwtStrategyService } from "../jwt/jwt-strategy.service";

import { UserEntity } from "src/entities/users.entity";
import { RefreshTokenEntity } from "src/entities/refresh-token.entity";

@Module({
  imports: [
    NestTypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    EmailVerificationModule,
    forwardRef(() => JwtModule),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtStrategyService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
