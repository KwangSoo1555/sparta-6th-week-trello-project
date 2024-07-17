import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { BoardService } from "./board.service";

import { JwtAccessGuards } from "src/modules/auth/jwt/jwt-strategy.service";
import { RequestUserAndToken } from "src/common/custom/decorator/user-request-jwt";

import { RoleGuards, Roles } from "src/common/custom/decorator/user-roles-guards";

import { CreateBoardDto } from "./dto/board.create.dto";
import { UpdateBoardDto } from "./dto/board.update.dto";
import { MemberRoles } from "src/common/custom/types/enum-member-roles";

@UseGuards(JwtAccessGuards)
@Controller("boards")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //Board 생성
  @Post()
  async createBoard(
    @RequestUserAndToken() { user: { id: userId } },
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return this.boardService.createBoard(createBoardDto, userId);
  }

  @Patch(":boardId")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @Roles(MemberRoles.ADMIN, MemberRoles.EDITOR)
  @UsePipes(ValidationPipe)
  async updateBoard(
    @Param("boardId") boardId,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.updateBoard(boardId, updateBoardDto);
  }

  @Delete(":boardId")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @Roles(MemberRoles.ADMIN)
  @UsePipes(ValidationPipe)
  async deleteBoard(
    @Param("boardId", ParseIntPipe) boardId
  ) {
    return this.boardService.deleteBoard(boardId);
  }

  @Post(":boardId/invite")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @Roles(MemberRoles.ADMIN)
  @UsePipes(ValidationPipe)
  async inviteBoard(
    @Param("boardId", ParseIntPipe) boardId
  ) {
    return this.boardService.inviteBoard(boardId);
  }

  @Get(':boardId')
  @UseGuards(JwtAccessGuards)
  async findBoardId(
    @Param('boardId') boardId: number,
    @RequestUserAndToken() { user: { id: userId } },
  ){
    return this.boardService.findBoard(boardId, userId)
  }
}
