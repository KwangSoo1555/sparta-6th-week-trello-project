import _ from "lodash";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
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
import { UsersEntity } from "src/entities/users.entity";

import { Redis } from "ioredis";

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
    @InjectRepository(UsersEntity)
    private UserRepository: Repository<UsersEntity>,
    @Inject("REDIS_CLIENT") private redisClient: Redis,
  ) {}

  //convenience function section
  async findMember(boardId: number, userId: number) {
    const member = await this.memberRepository.findOne({ where: { userId, boardId } });
    return member;
  }

  async checkMemberRole(boardId, userId: number, role: MemberRoles) {
    const member = await this.findMember(boardId, userId);
    if (member.role === role) {
      return true;
    }
    return false;
  }

  //==============================

  //보드 만들기
  async createBoard(createBoardDto: CreateBoardDto, userId: number) {
    //authorization section

    //====================================================
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
        isCreator: true,
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

  //보드 정보 업데이트
  async updateBoard(boardId: number, updateBoardDto: UpdateBoardDto, userId: number) {
    //authorization section
    if (await this.checkMemberRole(+boardId, userId, MemberRoles.ONLY_VIEW))
      //ONLY_VIEW일 경우 권한이 없다.
      throw new ConflictException("접근 권한이 없습니다.");
    //====================================================
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

  //보드 삭제
  async deleteBoard(boardId: string, userId: number) {
    //authorization section
    //해당 보드의 존재를 확인한 후 실행
    if (await this.memberRepository.findOne({ where: { userId, boardId: +boardId } })) {
      //삭제하려는 사람의 역할을 확인한 뒤 실행
      if (await this.checkMemberRole(+boardId, userId, MemberRoles.ADMIN)) {
        await this.boardRepository.delete(boardId);
        return { Message: `해당 {ID:${boardId}}보드는 성공적으로 삭제되었습니다.` };
      } else throw new ConflictException("접근 권한이 없습니다."); //나머지 역할의 경우 권한이 없다.
    } else
      return {
        Message: `해당 {ID:${boardId}}보드는 존재하지 않거나 해당 보드에 가입되어 있지 않습니다`,
      };
  }

  //보드 찾기
  async findBoard(boardId: number, userId: number) {
    //authorization section
    if (await this.checkMemberRole(+boardId, userId, MemberRoles.ONLY_VIEW))
      //ONLY_VIEW일 경우 권한이 없다.
      throw new ConflictException("접근 권한이 없습니다.");

    const member = await this.memberRepository.findOne({ where: { boardId, userId } });
    if (!member) {
      throw new ConflictException("접근 권한이 없습니다.");
    }
    //====================================================

    const board = await this.boardRepository.findOne({ where: { id: boardId } });
    const lists = await this.listRepository.find({ where: { boardId } });
    const listIds = lists.map((list) => list.id);

    const cards = await this.cardRepository.find({
      where: { listId: In(listIds) },
    });

    const boardData = {
      board: board.backgroundImageUrl,
      boardTilte: board.title,
      lists: lists.map((list) => ({
        ...list,
        cards: cards.filter((card) => card.listId === list.id),
      })),
    };

    return boardData;
  }

  //보드 초대 코드 만들기
  async inviteBoard(boardId: string, userId: number) {
    //authorization section
    //1.역할에 따른 권한 분류
    if (await this.checkMemberRole(+boardId, userId, MemberRoles.ONLY_VIEW))
      //ONLY_VIEW일 경우 권한이 없다.
      throw new ConflictException("접근 권한이 없습니다.");
    const number = Math.floor(Math.random() * 100000);

    const data = await this.redisClient.set(`inviteLink/board$${number}`, boardId);

    const result = await this.redisClient.get(`inviteLink/board$${number}`);

    return `inviteLink/board$${number}`;
  }
}
