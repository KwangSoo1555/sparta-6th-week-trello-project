import { Module } from "@nestjs/common";
import { TypeOrmModule } from "./database/typeorm/typeorm.module";

import { EmailVerificationModule } from "./modules/auth/email/email-verification.module"
import { UserAuthModule } from "./modules/auth/user-auth/user-auth.module"
import { JwtModule } from './modules/auth/jwt/jwt.module';
import { BoardModule } from "./modules/board/board.module";
import { FileModule } from "./modules/file/file.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule,
    EmailVerificationModule,
    UserAuthModule,
    JwtModule,
    BoardModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
