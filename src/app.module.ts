import { Module } from "@nestjs/common";
import { TypeOrmModule } from "./database/typeorm/typeorm.module";
import { RedisModule } from "./modules/redis/redis.module";
import { ConfigModule } from "@nestjs/config";

//modules
import { EmailVerificationModule } from "./modules/auth/email/email-verification.module";
import { UserAuthModule } from "./modules/auth/users-auth/user-auth.module";
import { GooglePassportModule } from "./modules/auth/social/google/google-passport.module"
import { JwtModule } from "./modules/auth/jwt/jwt.module";
import { UserModule } from "./modules/users/users.module";
import { MembersModule } from "./modules/members/members.module";
import { BoardModule } from "./modules/board/board.module";
import { ListModule } from "./modules/list/list.module";
import { CardModule } from "./modules/cards/card.module";
import { FileModule } from "./modules/file/file.module";
import { CardCommentModule } from "./modules/card-comment/card-comment.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EventsModule } from "./modules/events/events.module";
import { NaverPassportModule } from './modules/auth/social/naver/naver-passport.module';
import { KakaoPassportModule } from './modules/auth/social/kakao/kakao-passport.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule,
    RedisModule,
    EmailVerificationModule,
    UserAuthModule,
    GooglePassportModule,
    NaverPassportModule,
    KakaoPassportModule,
    JwtModule,
    UserModule,
    MembersModule,
    BoardModule,
    ListModule,
    CardModule,
    FileModule,
    CardCommentModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
