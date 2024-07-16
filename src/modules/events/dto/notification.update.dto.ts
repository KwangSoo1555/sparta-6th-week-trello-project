import { IsNotEmpty, IsNumber } from "class-validator";

export class NotificationUpdate {
  @IsNumber()
  @IsNotEmpty()
  boardId: number;
}
