import { Controller, Post, Body, UsePipes, ValidationPipe } from "@nestjs/common";

import { EmailVerificationService } from "./email-verification.service";

import { EmailVerificationDto } from "./email-verification.dto";

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
