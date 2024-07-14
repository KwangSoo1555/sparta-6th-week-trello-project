import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateCardDto {
  @IsString()
  @IsNotEmpty({ message: "카드내용을 입력해주세요" })
  content: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: "마감일이 입력되지 않았습니다" })
  cardDeadLine: Date;

  @IsString()
  @IsNotEmpty({ message: "체크 코멘트가 입력되지 않았습니다" })
  checkComment: string;
}
