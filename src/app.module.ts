import { Module } from "@nestjs/common";
import { TypeOrmModule } from "./database/typeorm/typeorm.module";
import { ConfigModule } from "@nestjs/config";

import { EmailVerificationModule } from "./modules/auth/email/email-verification.module";
import { UserAuthModule } from "./modules/auth/user-auth/user-auth.module";
import { JwtModule } from "./modules/auth/jwt/jwt.module";
import { BoardModule } from "./modules/board/board.module";
import { CardModule } from "./modules/cards/card.module";
import { FileModule } from "./modules/file/file.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule,
    EmailVerificationModule,
    UserAuthModule,
    JwtModule,
    BoardModule,
    CardModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
