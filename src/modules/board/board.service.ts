import { Injectable } from "@nestjs/common";
import _ from "lodash";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { BoardsEntity } from "../../entities/boards.entity"; //지울 예정
import { GenerateBoardDto } from "./dto/board.generate.dto";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardsEntity)
    private boardRepository: Repository<BoardsEntity>,
  ) {}
  async generateBoard(title: string, content: string, color: string) {
    await this.boardRepository.save({
      title,
      content,
      color,
    });
  }
}

