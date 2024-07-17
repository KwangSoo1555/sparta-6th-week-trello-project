import { Controller, Get, Patch, UseGuards, UsePipes, ValidationPipe, Body } from "@nestjs/common";
import { JwtAccessGuards } from "../auth/jwt/jwt-strategy.service";
import { RequestUserAndToken } from "src/common/custom/decorator/user-request-jwt";

import { UsersService } from "src/modules/users/users.service";

import { UsersUpdateDto } from "src/modules/users/users.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("me")
  @UseGuards(JwtAccessGuards)
  getUsers(@RequestUserAndToken() { user: { id: userId } }) {
    return this.usersService.getUsers(userId);
  }

  @Patch("me")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  updateUser(
    @RequestUserAndToken() { user: { id: userId } },
    @Body() updateUserDto: UsersUpdateDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Get("boards")
  @UseGuards(JwtAccessGuards)
  getBoards(
    @RequestUserAndToken() { user: { id: userId } }, 
  ) {
    return this.usersService.getBoards(userId);
  }
}
