import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { RefreshTokenEntity } from "src/entities/refresh-token.entity"
import { ENV } from "src/common/constants/env.constant";
import { MESSAGES } from "src/common/constants/messages.constant";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";

@Injectable()
export class JwtService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private jwtRepository: Repository<RefreshTokenEntity>,
  ) {}

  async tokenReissue(userId: number, refreshToken: string, ip: string, userAgent: string) {

    // refresh token 을 가지고 있는 유저인지 확인
    const existingRefreshToken = await this.jwtRepository.findOne({ where: { userId } });
    if (!existingRefreshToken) throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);

    // 제출한 refresh token 과 저장된 refresh token 이 일치하는지 확인
    const matchRefreshToken = await bcrypt.compare(refreshToken, existingRefreshToken.refreshToken);
    if (!matchRefreshToken) throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);

    // access token 과 refresh token 을 새롭게 발급
    const reIssueAccessToken = jwt.sign(
      { userId },
      ENV.ACCESS_TOKEN_SECRET,
      { expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN },
    );

    const reIssueRefreshToken = jwt.sign(
      { userId },
      ENV.REFRESH_TOKEN_SECRET,
      { expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN },
    );

    const hashedReIssueRefreshToken = await bcrypt.hash(
      reIssueRefreshToken,
      AUTH_CONSTANT.HASH_SALT_ROUNDS,
    );

    await this.jwtRepository.save({
      userId,
      refreshToken: hashedReIssueRefreshToken,
      ip,
      userAgent,
    });

    return {
      accessToken: reIssueAccessToken,
      refreshToken: reIssueRefreshToken,
    };
  }
}