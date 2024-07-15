import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Color } from "src/common/constants/types/color.type";

//constant
import { DTO_CONSTANT } from "src/common/constants/dtoconstant";

export declare class GenerateBoardDto {
  @IsString({ message: DTO_CONSTANT.NOT_INPUT_STRING })
  @IsNotEmpty({ message: DTO_CONSTANT.NOT_INPUT })
  title: string;

  @IsString({ message: DTO_CONSTANT.NOT_INPUT_STRING })
  @IsNotEmpty({ message: DTO_CONSTANT.NOT_INPUT })
  content: string;

  @IsEnum(Color, { message: DTO_CONSTANT.BOARD.NOT_LIST_IN_COLOR })
  @IsEnum(Color, { message: DTO_CONSTANT.NOT_INPUT })
  color: Color;
}
