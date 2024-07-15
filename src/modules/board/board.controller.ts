import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { BoardsEntity } from "../../entities/boards.entity";

import { GenerateBoardDto } from "./dto/board.generate.dto";
import { BoardService } from "./board.service";
import { ModifyBoardDto } from "./dto/board.modify.dto";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //Board 생성
  @Post("v1/boards")
  async generateBoard(@Body() generateBoardDto: GenerateBoardDto) {
    return await this.boardService.generateBoard(
      generateBoardDto.title,
      generateBoardDto.content,
      generateBoardDto.color,
    );
  }

  @Patch("v1/boards/:boardId")
  async modifyBoard(@Param("boardId") boardId: string, @Body() modifyBoardDto: ModifyBoardDto) {
    return await this.boardService.modifyBoard(
      boardId,
      modifyBoardDto.title,
      modifyBoardDto.content,
      modifyBoardDto.color,
    );
  }

  @Delete("v1/boards/:boardId")
  async deleteBoard(@Param("boardId") boardId: string) {
    return await this.boardService.deleteBoard(boardId);
  }

  @Post("v1/boards/:boardId/invite")
  async inviteBoard(@Param("BoardId") boardId: string) {
    return await this.boardService.inviteBoard(boardId);
  }
}
