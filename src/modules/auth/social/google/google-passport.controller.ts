import { Controller, Get, UseGuards, Req, Res, Ip, Headers } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { GooglePassportService } from "./google-passport.service";

@Controller("auth")
export class GooglePassportController {
  constructor(
    private googlePassportService: GooglePassportService
  ) {}

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleRedirect() {
    // 구글 로그인 페이지로 리다이렉트
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleLogin(
    @Ip() ip: string,
    @Headers("User-Agent") userAgent: string,
    @Req() req: any,
  ) {
    return this.googlePassportService.googleLogin(req, ip, userAgent);
  }
}
