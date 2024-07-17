import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { DTO_CONSTANT } from "src/common/constants/dto.constant";

export declare class CreateMemberDto {
  @IsString({})
  @IsNotEmpty({})
  invite_token: string;
}
