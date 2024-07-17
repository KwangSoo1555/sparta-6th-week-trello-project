import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { MemberRoles } from "src/common/custom/types/enum-member-roles";

export class UpdateMemberInfoDto {
  @IsEnum(MemberRoles)
  @IsOptional()
  memberRole?: MemberRoles;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsNumber()
  @IsOptional()
  targetUserId: number;
}
