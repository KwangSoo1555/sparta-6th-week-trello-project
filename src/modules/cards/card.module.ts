import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardController } from "src/modules/cards/card.controller";
import { CardService } from "src/modules/cards/card.service";
import { CardsEntity } from "src/entities/cards.entity";
import { ListsEntity } from "src/entities/lists.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CardsEntity, ListsEntity])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
