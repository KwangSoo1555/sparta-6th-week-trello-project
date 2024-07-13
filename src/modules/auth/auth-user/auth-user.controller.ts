import { Controller, Post, Body, UsePipes, ValidationPipe, Ip, Headers } from "@nestjs/common";

import { AuthUserService } from "src/modules/auth/auth-user/auth-user.service";

import { UserSignUpDto, UserSignInDto } from "./auth-user.dto";

@Controller("auth")
export class AuthUserController {
  constructor(private authUserService: AuthUserService) {}

  @Post("sign-up")
  @UsePipes(ValidationPipe)
  signUp(
    @Body() signUpDto: UserSignUpDto
  ) {
    return this.authUserService.signUp(signUpDto);
  }

  @Post("sign-in")
  @UsePipes(ValidationPipe)
  signIn(
    @Ip() ip: string,
    @Headers("user-agent") userAgent: string,
    @Body() signInDto: UserSignInDto,
  ) {
    return this.authUserService.signIn(signInDto, ip, userAgent);
  }
}
