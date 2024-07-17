import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";

import { BoardsEntity } from "src/entities/boards.entity";
import { MembersEntity } from "src/entities/members.entity";
import { ListsEntity } from "src/entities/lists.entity";
import { CardsEntity } from "src/entities/cards.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardsEntity,MembersEntity, ListsEntity, CardsEntity])],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
