import { IsNotEmpty, IsString } from "class-validator";
import { DTO_CONSTANT } from "src/common/constants/dto.constant.";
import { Color } from "src/common/constants/types/color.type";

export declare class GenerateBoardDto {
  @IsString()
  @IsNotEmpty({ message: DTO_CONSTANT.NOT_INPUT_TITLE })
  title: string;

  @IsString()
  @IsNotEmpty({ message: DTO_CONSTANT.NOT_INPUT_CONTENT })
  content: string;

  @IsString()
  color: Color;
}
