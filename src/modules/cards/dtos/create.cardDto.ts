import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateCardDto {
  @IsString()
  @IsNotEmpty({ message: "카드내용을 입력해주세요" })
  content: string;

  @IsDate()
  @IsNotEmpty({ message: "마감일이 입력되지 않았습니다" })
  cardDeadLine: Date;

  @IsString()
  @IsNotEmpty({ message: "색깔이 입력되지 않았습니다" })
  checkComment: string;
}
