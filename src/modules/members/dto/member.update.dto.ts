import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MemberRoles } from "src/common/custom/types/enum-member-roles";
import { DTO_CONSTANT } from "src/common/constants/dto.constant";

export class UpdateMemberInfoDto {
    @IsEnum(MemberRoles)
    @IsOptional()
    memberRole? :MemberRoles;

    @IsString()
    @IsOptional()
    nickname? :string;
}