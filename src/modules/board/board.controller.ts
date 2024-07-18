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

  //보드 정보 업데이트
  @Patch(":boardId")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  async updateBoard(
    @Param("boardId") boardId,
    @Body() updateBoardDto: UpdateBoardDto,
    @RequestUserAndToken() { user: { id: userId } },
  ) {
    return this.boardService.updateBoard(boardId, updateBoardDto, userId);
  }

  //보드 삭제
  @Delete(":boardId")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  async deleteBoard(
    @Param("boardId", ParseIntPipe) boardId,
    @RequestUserAndToken() { user: { id: userId } },
  ) {
    return this.boardService.deleteBoard(boardId, userId);
  }
  //유저 초대 링크 생성
  @Post(":boardId/invite")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  async inviteBoard(
    @Param("boardId", ParseIntPipe) boardId,
    @RequestUserAndToken() { user: { id: userId } },
  ) {
    return this.boardService.inviteBoard(boardId, userId);
  }
  //유저 보드 정보 조회
  @Get(":boardId")
  @UseGuards(JwtAccessGuards)
  async findBoardId(
    @Param("boardId") boardId: number,
    @RequestUserAndToken() { user: { id: userId } },
  ) {
    return this.boardService.findBoards(boardId, userId);
  }
}
