import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ConfigService } from "@nestjs/config";
import { EmailVerificationService } from "../email-verification/email-verification.service";

import { UserEntity } from "src/entities/users.entity";
import { UserSignUpDto, UserSignInDto } from "./auth-user.dto";
import { MESSAGES } from "src/common/constants/message.constant";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";
import { ENV } from "src/common/constants/env.constant";

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly configService: ConfigService,
  ) {}

  async checkUser(params: { email?: string, userId?: number }) {
    return this.userRepository.findOne({ where: { ...params } });
  }

  async signUp(signUpDto: UserSignUpDto) {
    const { email, password, verificationCode } = signUpDto;

    // 이메일 인증 코드 확인
    const sendedEmailCode = this.emailVerificationService.getCode(email);

    if (
      !sendedEmailCode ||
      this.emailVerificationService.isExpired(sendedEmailCode.timestamp) ||
      sendedEmailCode.code !== verificationCode
    )
      throw new BadRequestException(MESSAGES.AUTH.SIGN_UP.EMAIL.VERIFICATION_CODE.INCONSISTENT);

    // 이미 존재하는 유저인지 확인
    const existingUser = await this.checkUser({ email });
    if (existingUser)
      throw new ConflictException(MESSAGES.AUTH.SIGN_UP.EMAIL.DUPLICATED);

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, AUTH_CONSTANT.HASH_SALT_ROUNDS);

    // 유저 생성
    const user = this.userRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });

    const signUpUser = await this.userRepository.save(user);

    // 비밀번호 필드를 undefined로 설정
    signUpUser.password = undefined;

    return signUpUser;
  }

  async logIn(signInDto: UserSignInDto, ip: string, userAgent: string) {
    const { email, password } = signInDto;

    const user = await this.checkUser({ email });

    // 유저 존재 여부 확인
    if (!user) 
      throw new NotFoundException(MESSAGES.AUTH.SIGN_IN.EMAIL.NOT_FOUND);

    // 비밀번호 일치 여부 확인
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException(MESSAGES.AUTH.SIGN_IN.PASSWORD.INCONSISTENT);

    // JWT 발급
    const payload = { userId: user.id };

    const accessToken = jwt.sign(
      payload,
      ENV.ACCESS_TOKEN_SECRET,
      { expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN },
    );

    const refreshToken = jwt.sign(
      payload,
      ENV.REFRESH_TOKEN_SECRET,
      { expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN },
    );

    const hashedRefreshToken = bcrypt.hashSync(refreshToken, AUTH_CONSTANT.HASH_SALT_ROUNDS);

    // hashed refresh token 을 jwt entity 에 저장
    // await this.jwtRepository.storeRefreshToken(user.id, hashedRefreshToken, ip, userAgent);

    return {
      accessToken,
      refreshToken,
    };
  }
}