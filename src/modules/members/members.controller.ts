import { Controller, Query, Body, Get, Patch, Delete, Post } from "@nestjs/common";
import { MembersService } from "./members.service";
import { JwtAccessGuards } from "../auth/jwt/jwt-strategy.service";
import { RoleGuards, Roles } from "src/common/custom/decorator/user-roles-guards";
import { MemberRoles } from "src/common/custom/types/enum-member-roles";
import { UseGuards } from "@nestjs/common";
import { UpdateMemberInfoDto } from "./dto/member.update.dto";
import { CreateMemberDto } from "./dto/member.create.dto";
import { RequestUserAndToken } from "src/common/custom/decorator/user-request-jwt";

@UseGuards(JwtAccessGuards)
@Controller("members")
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get()
  async getMembers(
    @RequestUserAndToken() { user: { id: userId } },
    @Query("boardId") boardId: number,
  ) {
    return this.membersService.getMembers(boardId, userId);
  }

  //멤버 강제 추방
  @Delete("ban")
  @UseGuards(JwtAccessGuards)
  async banMember(
    @RequestUserAndToken() { user: { id: userId } },
    @Query("boardId") boardId: number,
    @Body() userIdForBan: number,
  ) {
    return this.membersService.banMember(userIdForBan, boardId, userId);
  }

  //멤버 역할 변경
  @Patch("permission")
  @UseGuards(JwtAccessGuards)
  async updateMemberRoles(
    @RequestUserAndToken() { user: { id: userId } },
    @Query("boardId") boardId: number,
    @Body() updateMemberInfoDto: UpdateMemberInfoDto,
    @Body() userIdForUpdatedRole: number,
  ) {
    return this.membersService.updateMemberRoles(
      updateMemberInfoDto,
      boardId,
      userIdForUpdatedRole,
      userId,
    );
  }

  //멤버 별명 변경
  @Patch("nickname")
  @UseGuards(JwtAccessGuards)
  async updateMemberNickname(
    @RequestUserAndToken() { user: { id: userId } },
    @Query("boardId") boardId: number,
    @Body() updateMemberInfoDto: UpdateMemberInfoDto,
  ) {
    return this.membersService.updateMemberNickname(updateMemberInfoDto, boardId, userId);
  }

  //멤버 상태 변경
  @Patch("update")
  @UseGuards(JwtAccessGuards)
  async updateMember(
    @RequestUserAndToken() { user: { id: userId } },
    @Query("boardId") boardId: number,
    @Body() updateMemberInfoDto: UpdateMemberInfoDto,
  ) {
    return this.membersService.updateMember(updateMemberInfoDto, boardId, userId);
  }

  @Post("join-member")
  @UseGuards(JwtAccessGuards)
  async createMember(
    @RequestUserAndToken() { user: { id: userId } },
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return await this.membersService.createMember(userId, createMemberDto);
  }
}
