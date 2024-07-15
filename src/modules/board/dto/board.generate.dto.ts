import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Color } from "src/common/constants/types/color.type";

export declare class GenerateBoardDto {
  @IsString()
  @IsNotEmpty({})
  title: string;

  @IsString()
  @IsNotEmpty({})
  content: string;

  @IsEnum(Color, {})
  color: Color;
}
