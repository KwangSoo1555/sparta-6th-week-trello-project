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

import { UserAuthService } from "./user-auth.service";
import { JwtRefreshGuards } from "../jwt/jwt-strategy.service";
import { UserSignUpDto, UserSignInDto } from "./user-auth.dto";
import { RequestUserAndToken } from "src/common/custom/user-request-jwt"

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
    @Body() signInDto: UserSignInDto,
  ) {
    return this.userAuthService.logIn(signInDto, ip, userAgent);
  }

  @Patch("log-out")
  @UseGuards(JwtRefreshGuards)
  logOut(
    @RequestUserAndToken() { user: { id: userId } },
  ) {
    return this.userAuthService.logOut(userId);
  }
}
