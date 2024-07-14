import { Module } from "@nestjs/common";
import { TypeOrmModule } from "./database/typeorm/typeorm.module";

import { BoardModule } from "./modules/board/board.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FileModule } from "./modules/file/file.module";
import { ListModule } from "./modules/list/list.module";

@Module({
  imports: [TypeOrmModule, BoardModule, FileModule, ListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
