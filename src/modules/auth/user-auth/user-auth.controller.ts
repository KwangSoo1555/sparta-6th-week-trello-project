import { Controller, Post, Body, UsePipes, ValidationPipe, Ip, Headers } from "@nestjs/common";

import { UserAuthService } from "./user-auth.service";

import { UserSignUpDto, UserSignInDto } from "./user-auth.dto";

@Controller("auth")
export class UserAuthController {
  constructor(private userAuthService: UserAuthService) {}

  @Post("sign-up")
  @UsePipes(ValidationPipe)
  signUp(
    @Body() signUpDto: UserSignUpDto
  ) {
    return this.userAuthService.signUp(signUpDto);
  }

  @Post("log-in")
  @UsePipes(ValidationPipe)
  logIn(
    @Ip() ip: string,
    @Headers("User-Agent") userAgent: string,
    @Body() signInDto: UserSignInDto,
  ) {
    return this.userAuthService.logIn(signInDto, ip, userAgent);
  }
}
