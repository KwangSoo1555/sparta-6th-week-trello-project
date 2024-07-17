import bcrypt from "bcrypt";
import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UsersEntity } from "src/entities/users.entity";
import { MembersEntity } from "src/entities/members.entity";
import { UsersUpdateDto } from "./users.dto";
import { MESSAGES } from "src/common/constants/messages.constant";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";
import { BoardsEntity } from "src/entities/boards.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private readonly memberRepository: Repository<MembersEntity>,
    @InjectRepository(BoardsEntity)
    private readonly boardRepository: Repository<BoardsEntity>
  ) {}

  async checkUserForUsers(params: { email?: string; id?: number }) {
    return this.userRepository.findOne({ where: { ...params } });
  }

  async getUsers(userId: number) {
    const user = await this.checkUserForUsers({ id: userId });

    user.password = undefined;
    return user;
  }

  async updateUser(userId: number, updateUserDto: UsersUpdateDto) {
    const user = await this.checkUserForUsers({ id: userId });

    // 유저가 새로운 이메일 입력 시 이메일 중복 체크
    if (updateUserDto.email) {
      const isEmailExist = await this.checkUserForUsers({
        email: updateUserDto.email,
      });
      if (isEmailExist) throw new ConflictException(MESSAGES.USERS.UPDATE_ME.EMAIL.DUPLICATED);
    }

    // 유저가 새로운 비밀번호 입력 시 현재 비밀번호 체크
    if (updateUserDto.newPassword) {
      // 현재 비밀번호 입력 누락 시 오류 발생
      if (!updateUserDto.currentPasswordCheck)
        throw new UnauthorizedException(
          MESSAGES.USERS.UPDATE_ME.PASSWORD.CURRENT_PASSWORD_REQUIRED,
        );

      // 새로운 비밀번호와 현재 비밀번호가 같으면 오류 발생
      if (updateUserDto.newPassword === updateUserDto.currentPasswordCheck)
        throw new UnauthorizedException(
          MESSAGES.USERS.UPDATE_ME.PASSWORD.NEW_PASSWORD_NOT_EQUAL_CURRENT_PASSWORD,
        );

      // 현재 비밀번호 입력 시 비밀번호 일치 여부 체크
      const isPasswordMatch = await bcrypt.compare(
        updateUserDto.currentPasswordCheck,
        user.password,
      );
      if (!isPasswordMatch)
        throw new UnauthorizedException(
          MESSAGES.USERS.UPDATE_ME.PASSWORD.CURRENT_PASSWORD_INCONSISTENT,
        );

      // 새로운 비밀번호 입력 시 비밀번호 해싱
      updateUserDto.newPassword = await bcrypt.hash(
        updateUserDto.newPassword,
        AUTH_CONSTANT.HASH_SALT_ROUNDS,
      );
    }

    await this.userRepository.update(
      { id: userId },
      {
        ...(user.email && { email: updateUserDto.email }),
        ...(user.name && { name: updateUserDto.name }),
        ...(user.password && { password: updateUserDto.newPassword }),
      },
    );

    // 업데이트된 유저 정보 반환
    const updatedUser = await this.checkUserForUsers({ id: userId });
    updatedUser.password = undefined;

    return updatedUser;
  }

  async getBoard(userId: number) {
    const [createdMembers, invitedMembers] = await Promise.all([
      this.memberRepository.find({ where: { userId, isCreator: true }, relations: ["board"] }),
      this.memberRepository.find({ where: { userId, isCreator: false }, relations: ["board"] })
    ]);
  
    // 보드의 추가 정보를 조회
    const createdBoardsWithDetails = await Promise.all(
      createdMembers.map(async (member) => {
        const board = await this.boardRepository.findOne({ where: { id: member.boardId } });
        console.log(board)
        return {
          boardId: member.boardId,
          title: board.title,
          color: board.color,
          role: member.role,
          backgroundImageUrl: board.backgroundImageUrl,
          nickname: member.nickname
        };
      })
    );
  
    const invitedBoardsWithDetails = await Promise.all(
      invitedMembers.map(async (member) => {
        const board = await this.boardRepository.findOne({ where: { id: member.boardId } });
        console.log(board)
        return {
          boardId: member.boardId,
          title: board.title,
          color: board.color,
          role: member.role,
          backgroundImageUrl: board.backgroundImageUrl,
          nickname: member.nickname
        };
      })
    );
  
    return {
      createdBoards: createdBoardsWithDetails,
      invitedBoards: invitedBoardsWithDetails
    };

  }
}
