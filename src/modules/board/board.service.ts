import _ from "lodash";
import { ConflictException, Injectable } from "@nestjs/common";
import { DataSource, In } from "typeorm";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { BoardsEntity } from "../../entities/boards.entity";
import { MembersEntity } from "../../entities/members.entity";
import { CreateBoardDto } from "./dto/board.create.dto";
import { UpdateBoardDto } from "./dto/board.update.dto";

//constant
import { BOARD_CONSTANT } from "src/common/constants/board.contant";
import { MemberRoles } from "src/common/custom/types/enum-member-roles";
import { Colors } from "src/common/custom/types/enum-color.type";
import { MESSAGES } from "src/common/constants/messages.constant";
import { CardsEntity } from "src/entities/cards.entity";
import { ListsEntity } from "src/entities/lists.entity";

@Injectable()
export class BoardService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(BoardsEntity)
    private boardRepository: Repository<BoardsEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(CardsEntity)
    private cardRepository: Repository<CardsEntity>,
    @InjectRepository(ListsEntity)
    private listRepository: Repository<ListsEntity>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const transactionCreateBoard = await this.boardRepository.save(createBoardDto);
      await this.memberRepository.save({
        boardId: transactionCreateBoard.id,
        userId: userId,
        role: MemberRoles.ADMIN,
        nickname: createBoardDto.nickname,
      });

      // if(!transactionCreateBoard) throw new {}

      await queryRunner.commitTransaction();

      return transactionCreateBoard;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateBoard(boardId: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.findOne({ where: { id: boardId } });
    await this.boardRepository.update(
      { id: boardId },
      {
        ...(board.title && { title: updateBoardDto.title }),
        ...(board.content && { content: updateBoardDto.content }),
        ...(board.color && { color: updateBoardDto.color }),
      },
    );
    return { Message: BOARD_CONSTANT.MODIFY_BOARD };
  }

  async deleteBoard(boardId: string) {
    await this.boardRepository.delete(boardId);
  }

  async inviteBoard(boardId: string) {
    // const id = Number(boardId);
    // if (isNaN(id)) {
    //   throw new Error("Invalid boardId"); // 유효하지 않은 ID에 대한 오류 처리
    // }
    // return { message: BOARD_CONSTANT.MAKE_INVITECODE };
    const id = Number(boardId);
    if (isNaN(id)) {
      throw new Error(MESSAGES.BOARD.INVALID_ACCESSED); // 유효하지 않은 ID에 대한 오류 처리
    }
    await this.boardRepository.delete({ id: id });
    return { message: BOARD_CONSTANT.DELETE_BOARD };
  }

async findBoard(boardId: number, userId: number) {
  const member = await this.memberRepository.findOne({ where: { boardId, userId } });
  if (!member) {
    throw new ConflictException('접근 권한이 없습니다.');
  }
  const board = await this.boardRepository.findOne({where: {id : boardId}})
  const lists = await this.listRepository.find({ where: { boardId } });
  const listIds = lists.map(list => list.id);

  const cards = await this.cardRepository.find({
    where: { listId: In(listIds) }
  });

  const boardData = {
    board: board.backgroundImageUrl,
    boardTilte: board.title,
    lists: lists.map(list => ({
      ...list,
      cards: cards.filter(card => card.listId === list.id)
    }))
  };

  return boardData;
}  
  // 충돌 코드
  
  // async inviteBoard(boardId: string) {
  //   const data = await this.redisClient.set(boardId, `inviteLink/board$${boardId}`);
  //   const result = await this.redisClient.get(boardId);

  //   return { message: BOARD_CONSTANT.MAKE_INVITECODE };
  // } 
  }
