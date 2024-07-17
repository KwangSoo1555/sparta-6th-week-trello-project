import {
  Controller,
  Post,
  Patch,
  Body,
  UsePipes,
  ValidationPipe,
  Ip,
  Headers,
  UseGuards,
} from "@nestjs/common";

import { UserAuthService } from "src/modules/auth/users-auth/user-auth.service";
import { JwtRefreshGuards } from "src/modules/auth/jwt/jwt-strategy.service";
import { UserSignUpDto } from "src/modules/auth/users-auth/dto/user-auth-sign-up.dto";
import { UserLogInDto } from "src/modules/auth/users-auth/dto/user-auth-log-in.dto";
import { RequestUserAndToken } from "src/common/custom/decorator/user-request-jwt";

@Controller("auth")
export class UserAuthController {
  constructor(private userAuthService: UserAuthService) {}

  @Post("sign-up")
  @UsePipes(ValidationPipe)
  signUp(@Body() signUpDto: UserSignUpDto) {
    return this.userAuthService.signUp(signUpDto);
  }

  @Post("log-in")
  @UsePipes(ValidationPipe)
  logIn(
    @Ip() ip: string,
    @Headers("User-Agent") userAgent: string,
    @Body() logInDto: UserLogInDto,
  ) {
    return this.userAuthService.logIn(logInDto, ip, userAgent);
  }

  @Patch("log-out")
  @UseGuards(JwtRefreshGuards)
  logOut(
    @RequestUserAndToken() { user: { id: userId } }
  ) {
    return this.userAuthService.logOut(userId);
  }
}
