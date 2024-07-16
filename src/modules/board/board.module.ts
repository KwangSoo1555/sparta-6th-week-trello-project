import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";

import { BoardsEntity } from "src/entities/boards.entity";
import { MembersEntity } from "src/entities/members.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardsEntity,MembersEntity])],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
