import { Controller, Get, Patch, UseGuards, UsePipes, ValidationPipe, Body } from "@nestjs/common";
import { JwtAccessGuards } from "../auth/jwt/jwt-strategy.service";
import { RequestUserAndToken } from "src/common/custom/decorator/user-request-jwt";

import { UsersService } from "src/modules/users/users.service";

import { UsersUpdateDto } from "src/modules/users/users.dto";

@Controller("users")
@UseGuards(JwtAccessGuards)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("me")
  getUsers(@RequestUserAndToken() { user: { id: userId } }) {
    return this.usersService.getUsers(userId);
  }

  @Patch("me")
  @UsePipes(ValidationPipe)
  updateUser(
    @RequestUserAndToken() { user: { id: userId } },
    @Body() updateUserDto: UsersUpdateDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Get("boards")
  getBoards(@RequestUserAndToken() { user: { id: userId } }) {
    return this.usersService.getBoard(userId);
  }
}
