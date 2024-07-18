import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Redis } from "ioredis";
import { Inject } from "@nestjs/common";
//entities
import { MembersEntity } from "src/entities/members.entity";
import { UsersEntity } from "src/entities/users.entity";

//dto
import { UpdateMemberInfoDto } from "./dto/member.update.dto";
import { CreateMemberDto } from "./dto/member.create.dto";

//enum
import { MemberRoles } from "src/common/custom/types/enum-member-roles";

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MembersEntity)
    private MembersRepository: Repository<MembersEntity>,

    @InjectRepository(UsersEntity)
    private UsersRepository: Repository<UsersEntity>,
    @Inject("REDIS_CLIENT") private redisClient: Redis,
  ) {}

  //convenience function section
  async findMember(boardId: number, userId: number) {
    const member = await this.MembersRepository.findOne({ where: { userId, boardId } });
    return member;
  }

  async checkMemberRole(boardId: number, userId: number, role: MemberRoles) {
    const member = await this.findMember(boardId, userId);
    if (member.role === role) {
      return true;
    }
    return false;
  }

  //==============================

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

  //새로운 유저 초대받아 들어오기
  async createMember(userId, createMemberDto: CreateMemberDto) {
    const { invite_token } = createMemberDto;

    //초대코드의 타입과, 참여할 보드로 나눔.
    const [tokenType, boardId] = invite_token.split("$");

    //토큰 타입이 다를 경우 null반환
    if (tokenType !== "inviteLink/board" || !boardId) return null;

    const result = await this.redisClient.get(invite_token);

    //모든 검증을 끝내면 멤버 테이블 추가 작업에 들어감.
    //해당 유저에 대한 정보를 받아오기
    const user = await this.UsersRepository.findOne({ where: { id: +userId } });

    // //멤버를 새로 등록하기
    console.log(`
      userId:${userId},
      boardId:${result},
      nickname:${user.name}`);

    if (await this.findMember(+result, userId)) return { message: "이미 존재하는 멤버입니다!" };

    console.log(await this.findMember(+result, userId));

    const member = await this.MembersRepository.save({
      userId: +userId,
      boardId: +result,
      role: MemberRoles.ONLY_VIEW,
      nickname: user.name,
    });

    return member;
  }
}
