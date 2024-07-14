import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardController } from "src/modules/cards/card.controller";
import { CardService } from "src/modules/cards/card.service";
import { CardEntity } from "src/entities/card.entity";
import { ListEntity } from "src/entities/list.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ListEntity])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
