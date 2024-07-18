import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserAuthModule } from "src/modules/auth/users-auth/user-auth.module";

import { JwtGoogleStrategy } from "./jwt-google-strategy.service";
import { GooglePassportService } from "./google-passport.service";
import { GooglePassportController } from "./google-passport.controller";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "google" }),
    UserAuthModule,
  ],
  controllers: [GooglePassportController],
  providers: [GooglePassportService, JwtGoogleStrategy],
})
export class GooglePassportModule {}
