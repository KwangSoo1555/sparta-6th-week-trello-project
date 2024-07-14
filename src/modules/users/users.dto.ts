import { IsString, IsNumber, IsEmail, MinLength, MaxLength, IsOptional } from "class-validator";

import { Exclude } from "class-transformer";
import { passwordMatch } from "src/common/custom/auth-validator";

export class UsersUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @Exclude({ toPlainOnly: true })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsOptional()
  @passwordMatch("password")
  passwordCheck: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsNumber()
  verificationCode: number;
}
