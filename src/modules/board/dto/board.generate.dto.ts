import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Colors } from "src/common/custom/types/enum-color.type";

//constant
import { DTO_CONSTANT } from "src/common/constants/dto.constant";

export declare class GenerateBoardDto {
  @IsString({ message: DTO_CONSTANT.NOT_INPUT_STRING })
  @IsNotEmpty({ message: DTO_CONSTANT.NOT_INPUT })
  title: string;

  @IsString({ message: DTO_CONSTANT.NOT_INPUT_STRING })
  @IsNotEmpty({ message: DTO_CONSTANT.NOT_INPUT })
  content: string;

  @IsEnum(Colors, { message: DTO_CONSTANT.BOARD.NOT_LIST_IN_COLOR })
  @IsEnum(Colors, { message: DTO_CONSTANT.NOT_INPUT })
  color: Colors;
}
