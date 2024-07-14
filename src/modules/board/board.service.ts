import { Injectable } from "@nestjs/common";
import _ from "lodash";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { BoardEntity } from "../../entities/board.entity"; //지울 예정
import { GenerateBoardDto } from "./dto/board.generate.dto";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}
  async generateBoard(title: string, content: string, color: string) {
    await this.boardRepository.save({
      title,
      content,
      color,
    });
  }
}
