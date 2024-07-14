import { IsNotEmpty, IsString } from "class-validator";

export declare class GenerateBoardDto {
  @IsString()
  @IsNotEmpty({message:"제목이 입력되지 않았습니다"})
  title: string;

  @IsString()
  @IsNotEmpty({message:"내용이 입력되지 않았습니다"})
  content: string;

  @IsString()
  @IsNotEmpty({message:"색깔이 입력되지 않았습니다"})
  color: string;
}
