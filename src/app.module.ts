import { Module } from "@nestjs/common";
import { TypeOrmModule } from "./database/typeorm/typeorm.module";

import { BoardModule } from "./modules/board/board.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FileModule } from './modules/file/file.module';
import { EmailVerificationModule } from './modules/auth/email-verification/email-verification.module';

@Module({
  imports: [TypeOrmModule, BoardModule, FileModule, EmailVerificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
