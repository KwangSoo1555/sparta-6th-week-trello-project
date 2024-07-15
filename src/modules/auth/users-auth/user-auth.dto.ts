import { IsNotEmpty, IsString, IsNumber, IsEmail, MinLength, MaxLength } from "class-validator";

import { Exclude } from "class-transformer";
import { passwordMatch } from "src/common/custom/pipes/auth-validator"

export class UserSignUpDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @passwordMatch("password")
  passwordCheck: string;

  @IsNotEmpty()
  @IsNumber()
  verificationCode: number;
}

export class UserLogInDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
