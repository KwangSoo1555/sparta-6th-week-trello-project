import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { DTO_CONSTANT } from "src/common/constants/dto.constant";
export class UpdateCardDto {
  @IsString()
  @IsNotEmpty({ message: DTO_CONSTANT.CARD.NOT_INPUT_TITLE })
  cardTitle: string;

  @IsString()
  @IsNotEmpty({ message: DTO_CONSTANT.CARD.NOT_INPUT_CONTENT })
  content: string;

  @IsString()
  @IsNotEmpty({ message: DTO_CONSTANT.CARD.NOT_INPUT_BACKGROUNDCOLOR })
  backgroundColor: string;

  @IsNumber()
  @IsNotEmpty({ message: DTO_CONSTANT.CARD.NOT_INPUT_CARDMEMBER })
  cardMember: number;
}
