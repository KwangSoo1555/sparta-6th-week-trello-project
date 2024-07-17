import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserAuthModule } from "src/modules/auth/users-auth/user-auth.module";

import { JwtNaverStrategy } from "./jwt-naver-strategy.service"
import { NaverPassportService } from "./naver-passport.service"
import { NaverPassportController } from "./naver-passport.controller"

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "naver" }),
    UserAuthModule,
  ],
  controllers: [NaverPassportController],
  providers: [NaverPassportService, JwtNaverStrategy],
})
export class NaverPassportModule {}
