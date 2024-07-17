import { Controller, Get, Patch, UseGuards, UsePipes, ValidationPipe, Body } from "@nestjs/common";
import { JwtAccessGuards } from "../auth/jwt/jwt-strategy.service";
import { RequestUserAndToken } from "src/common/custom/decorator/user-request-jwt";

import { UserService } from "src/modules/users/users.service"

import { UsersUpdateDto } from "src/modules/users/users.dto";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  getUsers(@RequestUserAndToken() { user: { id: userId } }) {
    return this.userService.getUsers(userId);
  }

  @Patch("me")
  @UsePipes(ValidationPipe)
  updateUser(
    @RequestUserAndToken() { user: { id: userId } },
    @Body() updateUserDto: UsersUpdateDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Get("boards")
  @UseGuards(JwtAccessGuards)
  getBoards(
    @RequestUserAndToken() { user: { id: userId } }, 
  ) {
    return this.userService.getBoards(userId);
  }
}
