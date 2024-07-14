import { Controller, Post, UsePipes, ValidationPipe, UseGuards, Headers, Ip } from "@nestjs/common";

import { JwtService } from "src/modules/auth/jwt/jwt.service";

import { JwtRefreshGuards } from "src/modules/auth/jwt/jwt-strategy.service";
import { RequestUserAndToken } from "src/common/custom/user-request-jwt";

@Controller("auth")
export class JwtController {
  constructor(private jwtService: JwtService) {}

  @Post("jwt-reissue")
  @UseGuards(JwtRefreshGuards)
  @UsePipes(ValidationPipe)
  tokenReissue(
    @RequestUserAndToken() { user: { id: userId }, token: refreshToken },
    @Ip() ip: string,
    @Headers("user-agent") userAgent: string,
  ) {
    return this.jwtService.tokenReissue(userId, refreshToken, ip, userAgent);
  }
}
