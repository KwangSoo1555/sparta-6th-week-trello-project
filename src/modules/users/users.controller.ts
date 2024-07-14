import { Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { JwtAccessGuards } from "../auth/jwt/jwt-strategy.service";
import { RequestUserAndToken } from "src/common/custom/user-request-jwt";

import { UsersService } from "src/modules/users/users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("me")
  @UseGuards(JwtAccessGuards)
  getUsers(
    @RequestUserAndToken() { user: { id: userId } },
  ) {
    return this.usersService.getUsers(userId);
  }

//   @Post("jwt-reissue")
//   @UseGuards(JwtRefreshGuards)
//   @UsePipes(ValidationPipe)
//   tokenReissue(
//     @RequestUserAndToken() { user: { id: userId }, token: refreshToken },
//     @Ip() ip: string,
//     @Headers("user-agent") userAgent: string,
//   ) {
//     return this.jwtService.tokenReissue(userId, refreshToken, ip, userAgent);
//   }
}
