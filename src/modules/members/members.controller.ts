import { Controller, Query, Body, Patch, Delete } from "@nestjs/common";
import { MembersService } from "./members.service";
import { JwtAccessGuards } from "../auth/jwt/jwt-strategy.service";
import { RoleGuards, Roles } from "src/common/custom/decorator/user-roles-guards";
import { MemberRoles } from "src/common/custom/types/enum-member-roles";
import { UseGuards } from "@nestjs/common";
import { UpdateMemberInfoDto } from "./dto/member.update.dto";
import { RequestUserAndToken } from "src/common/custom/decorator/user-request-jwt";

@UseGuards(JwtAccessGuards)
@Controller("members")
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Delete("ban")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @Roles(MemberRoles.ADMIN)
  async banMember(
    @RequestUserAndToken() { user: { id: userId } },
    @Query("boardId") boardId: number,
    @Body() userIdForBan: number,
  ) {
    return this.membersService.banMember(userIdForBan, boardId, userId);
  }

  @Patch("permission")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @Roles(MemberRoles.ADMIN)
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

  @Patch("nickname")
  @UseGuards(JwtAccessGuards)
  async updateMemberNickname(
    @RequestUserAndToken() { user: { id: userId } },
    @Query("boardId") boardId: number,
    @Body() updateMemberInfoDto: UpdateMemberInfoDto,
  ) {
    return this.membersService.updateMemberNickname(updateMemberInfoDto, boardId, userId);
  }
}
