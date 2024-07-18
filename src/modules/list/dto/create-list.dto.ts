import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;
}
