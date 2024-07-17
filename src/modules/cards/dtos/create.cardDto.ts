import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { DTO_CONSTANT } from "src/common/constants/dto.constant";

export class CreateCardDto {
  @IsString()
  @IsNotEmpty({ message: DTO_CONSTANT.CARD.NOT_INPUT_CARD })
  content: string;
}
