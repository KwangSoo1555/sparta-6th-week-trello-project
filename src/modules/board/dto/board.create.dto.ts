import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Colors } from "src/common/custom/types/enum-color.type";

//constant
import { DTO_CONSTANT } from "src/common/constants/dto.constant";

export declare class CreateBoardDto {
  @IsString({ message: DTO_CONSTANT.NOT_INPUT_STRING })
  @IsNotEmpty({ message: DTO_CONSTANT.NOT_INPUT })
  title: string;

  @IsString({ message: DTO_CONSTANT.NOT_INPUT_STRING })
  @IsNotEmpty({ message: DTO_CONSTANT.NOT_INPUT })
  content: string;

  @IsEnum(Colors, { message: DTO_CONSTANT.BOARD.NOT_LIST_IN_COLOR })
  @IsNotEmpty({ message: DTO_CONSTANT.NOT_INPUT })
  color: Colors;

  @IsString({ message: DTO_CONSTANT.NOT_INPUT_STRING })
  @IsOptional()
  nickname?: string;
}
