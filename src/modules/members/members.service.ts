import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { MembersEntity } from "src/entities/members.entity";
import { UpdateMemberInfoDto } from "./dto/member.update.dto";

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MembersEntity)
    private MembersRepository: Repository<MembersEntity>,
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
}
