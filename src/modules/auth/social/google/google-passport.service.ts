import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserAuthService } from "../../users-auth/user-auth.service";

import { MESSAGES } from "src/common/constants/messages.constant";

@Injectable()
export class GooglePassportService {
  constructor(
    private userAuthService: UserAuthService,
    private configService: ConfigService,
  ) {}

  async googleLogin(req: any, ip: string, userAgent: string) {
    try {
      const { user } = req;
      user.nickname = user.firstName + user.lastName;
      delete user.lastName;
      delete user.firstName;
      user.type = "google";

      // 유저 중복 검사 후 존재하지 않는 유저면 회원가입
      const findUser = await this.userAuthService.checkUserForAuth({ email: user.email });
      if (!findUser) {
        await this.userAuthService.signUp(user);
      }

      // 기존 로컬 로그인 로직 재사용
      const loginDto = { email: user.email, password: user.password };
      const tokens = await this.userAuthService.logIn(loginDto, ip, userAgent);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException(MESSAGES.AUTH.LOG_IN.GOOGLE.EMAIL);
    }
  }
}
