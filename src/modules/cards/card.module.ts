import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardController } from "src/modules/cards/card.controller";
import { CardService } from "src/modules/cards/card.service";
import { CardsEntity } from "src/entities/cards.entity";
import { ListsEntity } from "src/entities/lists.entity";
import { CardAssigneesEntity } from "src/entities/card-assignees.entity";
import { NotificationEntity } from "src/entities/notification.entity";
import { EventsModule } from "../events/events.module";

@Module({
  imports: [EventsModule,TypeOrmModule.forFeature([CardsEntity, ListsEntity, CardAssigneesEntity, NotificationEntity])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
