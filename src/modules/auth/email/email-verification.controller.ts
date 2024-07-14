import { Controller, Post, Body, UsePipes, ValidationPipe } from "@nestjs/common";

import { EmailVerificationService } from "src/modules/auth/email/email-verification.service";

import { EmailVerificationDto } from "src/modules/auth/email/email-verification.dto";

@Controller("auth")
export class EmailVerificationController {
  constructor(private emailVerificationService: EmailVerificationService) {}

  @Post("email-verification")
  @UsePipes(ValidationPipe)
  async sendAuthEmail(
    @Body() emailVerificationDto: EmailVerificationDto
  ) {
    return this.emailVerificationService.sendAuthEmail(emailVerificationDto);
  }
}
