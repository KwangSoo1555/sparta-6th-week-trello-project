import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCardDto {
  @IsString()
  @IsNotEmpty({ message: "카드내용을 입력해주세요" })
  content: string;

  @IsNumber()
  @IsNotEmpty({ message: "넥스트 인덱스가 입력되지 않았습니다" })
  nextIndex: number;
}
