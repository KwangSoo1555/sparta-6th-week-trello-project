import { Module } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";

import { EmailVerificationModule } from "../email-verification/email-verification.module";

import { AuthUserController } from "./auth-user.controller";
import { AuthUserService } from "./auth-user.service";

import { UserEntity } from "src/entities/users.entity";

@Module({
  imports: [
    NestTypeOrmModule.forFeature([UserEntity]),
    EmailVerificationModule,
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
