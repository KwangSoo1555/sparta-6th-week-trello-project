import { Module } from "@nestjs/common";
import { CardController } from "./card.controller";
import { CardService } from "./card.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardEntity } from "src/entities/card.entity";
import { ListEntity } from "src/entities/list.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ListEntity])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
