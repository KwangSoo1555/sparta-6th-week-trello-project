import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//entities
import { MembersEntity } from "src/entities/members.entity";
import { UsersEntity } from "src/entities/users.entity";

import { UpdateMemberInfoDto } from "./dto/member.update.dto";
import { CreateMemberDto } from "./dto/member.create.dto";

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MembersEntity)
    private MembersRepository: Repository<MembersEntity>,

    @InjectRepository(UsersEntity)
    private UsersRepository: Repository<UsersEntity>,
  ) {}

  async getMembers(boardId: number, userId: number) {
    const members = await this.MembersRepository.find({
      where: { boardId: boardId },
    });
    return members;
  }

  async banMember(userIdForBan: number, boardId: number, userId: number) {
    const member = await this.MembersRepository.findOne({
      where: { userId: userIdForBan, boardId: boardId },
    });

    if (!member) throw new NotFoundException({ message: "해당 보드에 속한 유저가 아닙니다." });

    this.MembersRepository.delete({ id: member.id });
  }

  async updateMemberRoles(
    updateMemberInfoDto: UpdateMemberInfoDto,
    userId: number,
    boardId: number,
    userIdForUpdateRole: number,
  ) {
    const { memberRole, nickname } = updateMemberInfoDto;
    const member = await this.MembersRepository.findOne({
      where: { userId: userId, boardId: boardId },
    });
    await this.MembersRepository.update(
      { id: member.id },
      {
        role: memberRole,
        nickname: nickname,
      },
    );
  }

  async updateMemberNickname(
    updateMemberInfoDto: UpdateMemberInfoDto,
    boardId: number,
    userId: number,
  ) {
    const { nickname } = updateMemberInfoDto;
    const member = await this.MembersRepository.findOne({
      where: { userId, boardId },
    });

    if (!member) throw new NotFoundException({ message: "해당 보드에 속한 유저가 아닙니다." });

    await this.MembersRepository.update({ id: member.id }, { nickname });
  }

  async createMember(createMemberDto: CreateMemberDto) {
    const [participateId, userId, token] = [
      createMemberDto.participateId,
      createMemberDto.userId,
      createMemberDto.invite_token,
    ];

    //초대코드의 타입과, 참여할 보드로 나눔.
    const [tokenType, boardId] = token.split("$");
    if (tokenType !== "inviteLink/board" || !boardId) return null;

    //참여  코드의 비번 Id와 참여할 보드 Id 같지 않으면 널값 반환.
    if (+boardId !== participateId) return null;

    //모든 검증을 끝내면 유저 테이블 추가 작업에 들어감.
    //해당 유저에 대한 정보를 받아오기
    const user = await this.UsersRepository.findOne({ where: { id: +userId } });

    //멤버를 새로 등록하기
    return await this.MembersRepository.save({
      userId: userId,
      boarId: boardId,
      nickname: user.name,
    });
  }
}
