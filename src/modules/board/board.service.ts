import { Injectable } from "@nestjs/common";
import _ from "lodash";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { BoardsEntity } from "../../entities/boards.entity"; //지울 예정
import { GenerateBoardDto } from "./dto/board.generate.dto";

//constant
import { BOARD_CONSTANT } from "src/common/constants/board.contant";
import { Colors } from "src/common/custom/types/enum-color.type";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardsEntity)
    private boardRepository: Repository<BoardsEntity>,
  ) {}

  async generateBoard(title: string, content: string, color: Colors) {
    await this.boardRepository.save({
      title,
      content,
      color,
    });
    return { Message: BOARD_CONSTANT.GENERATE_BOARD };
  }

  async modifyBoard(boardId: string, title: string, content: string, color: Colors) {
    await this.boardRepository.update(boardId, {
      title,
      content,
      color,
    });
    return { Message: BOARD_CONSTANT.MODIFY_BOARD };
  }

  async deleteBoard(boardId: string) {
    const id = Number(boardId);
    if (isNaN(id)) {
      throw new Error("Invalid boardId"); // 유효하지 않은 ID에 대한 오류 처리
    }
    await this.boardRepository.delete({ id: id });
    return { message: BOARD_CONSTANT.DELETE_BOARD };
  }

  async inviteBoard(boardId: string) {
    const id = Number(boardId);
    if (isNaN(id)) {
      throw new Error("Invalid boardId"); // 유효하지 않은 ID에 대한 오류 처리
    }

    return { message: BOARD_CONSTANT.MAKE_INVITECODE };
  }
}
