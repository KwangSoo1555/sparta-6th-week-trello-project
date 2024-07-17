import { IsNotEmpty, IsNumber } from "class-validator";
import { DTO_CONSTANT } from "src/common/constants/dto.constant";

export class SwapCardDto {
  @IsNumber()
  @IsNotEmpty({ message: DTO_CONSTANT.CARD.NOT_INPUT_SWAPCARD })
  swapList1: number;

  @IsNumber()
  @IsNotEmpty({ message: DTO_CONSTANT.CARD.NOT_INPUT_SWAPCARD })
  swapCard1: number;
}
