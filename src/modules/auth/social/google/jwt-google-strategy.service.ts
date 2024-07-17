import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      clientID: configService.get("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.get("GOOGLE_CALLBACK_URL"),
      scope: ["email", "profile"],
    });
  }

  // authorizationParams(): { [key: string]: string } {
  //   return {
  //     access_type: "offline",
  //     prompt: "consent",
  //   };
  // }

  async validate(
    // 구글 로그인 시 반환되는 토큰의 타입은 다음과 같다.
    // --> accessToken: string,
    // --> refreshToken: string,

    // 그러나 구글에서 제공하는 access token 으로 권한에 접근하려면
    // 로컬에서 쓰는 토큰과 별개의 guard 절차가 필요해지며 로직이 복잡해질 것으로 사료된다.
    // 그러므로 우선 로그인 시 반환되는 토큰을 사용하지 않고
    // 로컬 로그인 시 사용하는 토큰을 사용한다.
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      const { name, emails } = profile;
      const user = {
        email: emails[0].value,
        firstName: name.familyName,
        lastName: name.givenName,
      };
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
