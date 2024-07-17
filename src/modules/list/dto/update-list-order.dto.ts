import { IsNumber, IsNotEmpty } from "class-validator";

export class UpdateListOrderDto {
  @IsNumber()
  @IsNotEmpty()
  newPositionId: number;
}
