import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCardDto {
  @IsString()
  @IsNotEmpty({ message: "카드 제목을 입력해주세요" })
  cardTitle: string;

  @IsString()
  @IsNotEmpty({ message: "카드내용을 입력해주세요" })
  content: string;

  @IsString()
  @IsNotEmpty({ message: "카드 색상이 입력되지 않았습니다" })
  backgroundColor: string;

  @IsNumber()
  @IsNotEmpty({ message: "카드 작업자가 입력되지 않았습니다" })
  cardMember: number;
}
