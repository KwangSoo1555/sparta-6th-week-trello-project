import { Module } from "@nestjs/common";
import { EmailVerificationController } from "src/modules/auth/email/email-verification.controller";
import { EmailVerificationService } from "src/modules/auth/email/email-verification.service";

@Module({
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}
