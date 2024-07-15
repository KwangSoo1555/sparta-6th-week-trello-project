import { Injectable } from "@nestjs/common";
import _ from "lodash";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { BoardsEntity } from "../../entities/boards.entity"; //지울 예정
import { GenerateBoardDto } from "./dto/board.generate.dto";
import { Color } from "src/common/constants/types/color.type";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardsEntity)
    private boardRepository: Repository<BoardsEntity>,
  ) {}

  async generateBoard(title: string, content: string, color: Color) {
    await this.boardRepository.save({
      title,
      content,
      color,
    });
  }

  async modifyBoard(boardId: string, title: string, content: string, color: Color) {
    await this.boardRepository.update(boardId, {
      title,
      content,
      color,
    });
  }

  async deleteBoard(boardId: string) {
    const id = Number(boardId);
    if (isNaN(id)) {
      throw new Error("Invalid boardId"); // 유효하지 않은 ID에 대한 오류 처리
    }
    return await this.boardRepository.delete({ id: id });
  }

  async inviteBoard(boardId: string) {
    const id = Number(boardId);
    if (isNaN(id)) {
      throw new Error("Invalid boardId"); // 유효하지 않은 ID에 대한 오류 처리
    }
  }
}
