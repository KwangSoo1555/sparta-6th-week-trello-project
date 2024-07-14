// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { PassportStrategy, AuthGuard } from "@nestjs/passport";
// import { JwtPayload } from "jsonwebtoken";

// import { UserAuthService } from "src/modules/auth/user-auth/user-auth.service";

// import { ENV } from "src/common/constants/env.constant";
// import { MESSAGES } from "src/common/constants/messages.constant";

// @Injectable()
// export class JwtStrategyService extends PassportStrategy(Strategy, "jwt") {
//   constructor(
//     private userAuthService: UserAuthService,
//     private configService: ConfigService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       // secretOrKey: (payload: JwtPayload, done) => {
//       //   const secret =
//       //     payload.type === "access"
//       //       ? configService.get<string>(ENV.ACCESS_TOKEN_SECRET)
//       //       : configService.get<string>(ENV.REFRESH_TOKEN_SECRET);
//       //   done(null, secret);
//       // },
//       secretOrKeyProvider: (request, rawJwtToken, done) => {
//         try {
//           const token = rawJwtToken.split('.')[1];
//           const payload = JSON.parse(Buffer.from(token, 'base64').toString());
//           const secret = payload.type === 'access' 
//             ? this.configService.get<string>(ENV.ACCESS_TOKEN_SECRET)
//             : this.configService.get<string>(ENV.REFRESH_TOKEN_SECRET);
//           done(null, secret);
//         } catch (error) {
//           done(error, null);
//         }
//       },
//     });
//   }

//   async validate(payload: JwtPayload) {
//     const user = await this.userAuthService.checkUser({ userId: payload.userId });
//     if (!user) throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);

//     return user;
//   }
// }

// @Injectable()
// export class JwtAccessGuards extends AuthGuard("jwt") {}

// @Injectable()
// export class JwtRefreshGuards extends AuthGuard("jwt") {}


import { Injectable, UnauthorizedException, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy, AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";

import { UserAuthService } from "src/modules/auth/user-auth/user-auth.service";

import { ENV } from "src/common/constants/env.constant";
import { MESSAGES } from "src/common/constants/messages.constant";

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private userAuthService: UserAuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        try {
          const token = rawJwtToken.split('.')[1];
          const payload = JSON.parse(Buffer.from(token, 'base64').toString());
          const secret = payload.type === 'access' 
            ? this.configService.get<string>(ENV.ACCESS_TOKEN_SECRET)
            : this.configService.get<string>(ENV.REFRESH_TOKEN_SECRET);
          done(null, secret);
        } catch (error) {
          done(error, null);
        }
      }
    });
  }

  async validate(payload: JwtPayload) {
    console.log("Payload:", payload); // 디버깅을 위해 추가
    const user = await this.userAuthService.checkUser({ userId: payload.userId });
    if (!user) throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);

    return user;
  }
}

@Injectable()
export class JwtAccessGuards extends AuthGuard("jwt") {}

@Injectable()
export class JwtRefreshGuards extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    console.log("JwtRefreshGuards: canActivate called");
    return super.canActivate(context);
  }
}