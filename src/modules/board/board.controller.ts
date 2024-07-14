import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { BoardsEntity } from "../../entities/boards.entity"; 

import { GenerateBoardDto } from "./dto/board.generate.dto";
import { BoardService } from "./board.service";

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
}