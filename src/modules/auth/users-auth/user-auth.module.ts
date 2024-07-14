import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";
import { EmailVerificationModule } from "src/modules/auth/email/email-verification.module";
import { JwtModule } from "src/modules/auth/jwt/jwt.module";

import { UserAuthService } from "src/modules/auth/users-auth/user-auth.service";
import { UserAuthController } from "src/modules/auth/users-auth/user-auth.controller";

import { UsersEntity } from "src/entities/users.entity";
import { RefreshTokensEntity } from "src/entities/refresh-tokens.entity";

@Module({
  imports: [
    NestTypeOrmModule.forFeature([UsersEntity, RefreshTokensEntity]),
    EmailVerificationModule,
    forwardRef(() => JwtModule),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
