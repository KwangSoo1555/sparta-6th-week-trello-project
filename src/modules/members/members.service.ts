import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//entities
import { MembersEntity } from "src/entities/members.entity";
import { UsersEntity } from "src/entities/users.entity";

//dto
import { UpdateMemberRoleDto } from "./dto/member.updaterole.dto";
import { UpdateMembernicknameDto } from "./dto/member.updatenickname.dto";
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
  ) {}

  //convenience function section
  async findMember(boardId: number, userId: number) {
    const member = await this.MembersRepository.findOne({ where: { userId: userId, boardId } });
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
  //1.
  async getMembers(boardId: number, userId: number) {
    const members = await this.MembersRepository.find({
      where: { boardId: boardId },
    });
    return members;
  }
  //2.멤버 강제 추방
  async banMember(userIdForBan: number, boardId: number, userId: number) {
    if (await this.checkMemberRole(boardId, userId, MemberRoles.ONLY_VIEW))
      throw new NotFoundException({ message: "권한이 없습니다." });

    //강퇴할 대상을 담고있는 객체를 변수로 변경
    const target = userIdForBan["userId"];

    const member = await this.MembersRepository.findOne({
      where: { userId: target, boardId: boardId },
    });
    //해당 유저가 서버에 없을 때
    if (!member) throw new NotFoundException({ message: "해당 보드에 속한 유저가 아닙니다." });

    //헤당 유저가 더 권한이 높을 때
    if (await this.checkMemberRole(boardId, target, MemberRoles.ADMIN)) {
      throw new NotFoundException({
        message: "해당 유저는 당신과 동등하거나 더 높은 권한을 가지고 있습니다.",
      });
    }
    this.MembersRepository.delete({ id: member.id });
    return { message: "해당유저가 성공적으로 강퇴되었습니다." };
  }

  //3.멤버 역할 수정

  async updateMemberRoles(updateMemberRoleDto, boardId: number, userId: number) {
    const { targetUserId, memberRole } = updateMemberRoleDto;

    const targetMember = await this.findMember(boardId, targetUserId);

    //실행 성공 케이스
    if (targetUserId === userId) {
      this.MembersRepository.update({ boardId, userId }, { role: memberRole });
    }

    if (await this.checkMemberRole(boardId, targetUserId, MemberRoles.ADMIN)) {
      throw new NotFoundException({
        message: "해당 유저는 당신과 동등하거나 더 높은 권한을 가지고 있습니다.",
      });
    } else if (!(await this.checkMemberRole(boardId, userId, MemberRoles.ADMIN)))
      throw new NotFoundException("접근할 권한이 없습니다");
    else {
      this.MembersRepository.update({ boardId, userId }, { role: memberRole });
    }
    return { message: "유저 정보가 성공적으로 수정되었습니다." };
  }
  //4.멤버 닉네임 수정
  async updateMemberNickname(updateMembernicknameDto, boardId, userId) {}

  //5.새로운 유저 초대받아 들어오기
  async createMember(userId, createMemberDto: CreateMemberDto) {
    const { invite_token } = createMemberDto;

    //초대코드의 타입과, 참여할 보드로 나눔.
    const [tokenType, boardId] = invite_token.split("$");

    //토큰 타입이 다를 경우 null반환
    if (tokenType !== "inviteLink/board" || !boardId) return null;

    //모든 검증을 끝내면 멤버 테이블 추가 작업에 들어감.
    //해당 유저에 대한 정보를 받아오기
    const user = await this.UsersRepository.findOne({ where: { id: +userId } });

    // //멤버를 새로 등록하기
    console.log(`
      userId:${userId},
      boardId:${boardId},
      nickname:${user.name}`);

    if (await this.findMember(+boardId, userId)) return { message: "이미 존재하는 멤버입니다!" };

    console.log(await this.findMember(+boardId, userId));

    const member = await this.MembersRepository.save({
      userId: +userId,
      boardId: +boardId,
      role: MemberRoles.ONLY_VIEW,
      nickname: user.name,
    });

    return member;
  }
}
