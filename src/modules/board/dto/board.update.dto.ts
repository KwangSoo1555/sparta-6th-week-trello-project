import { IsString,IsEnum, IsOptional} from "class-validator";
import { DTO_CONSTANT } from "src/common/constants/dto.constant";
import { Colors } from "src/common/custom/types/enum-color.type";

export declare class UpdateBoardDto {
  @IsString({ message: DTO_CONSTANT.NOT_INPUT_STRING })
  @IsOptional()
  title?: string;

  @IsString({ message: DTO_CONSTANT.NOT_INPUT_STRING })
  @IsOptional()
  content?: string;

  @IsEnum(Colors, { message: DTO_CONSTANT.BOARD.NOT_LIST_IN_COLOR })
  @IsOptional()
  color?: Colors;
}
