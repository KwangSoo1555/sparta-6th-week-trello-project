import { Module } from "@nestjs/common";
import { TypeOrmModule } from "./database/typeorm/typeorm.module";

import { EmailVerificationModule } from "./modules/auth/email-verification/email-verification.module";
import { AuthUserModule } from "./modules/auth/auth-user/auth-user.module";
import { BoardModule } from "./modules/board/board.module";
import { FileModule } from "./modules/file/file.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardModule } from "./modules/cards/card.module";

@Module({
  imports: [
    TypeOrmModule,
    BoardModule,
    FileModule,
    EmailVerificationModule,
    AuthUserModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
