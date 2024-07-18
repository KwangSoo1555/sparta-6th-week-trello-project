import { Module } from "@nestjs/common";

import { EmailVerificationService } from "src/modules/auth/email/email-verification.service";
import { EmailVerificationController } from "src/modules/auth/email/email-verification.controller";


@Module({
  imports: [
  ],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}
