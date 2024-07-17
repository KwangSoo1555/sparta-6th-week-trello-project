import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/entities/notification.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { CardsEntity } from 'src/entities/cards.entity';
import { CardAssigneesEntity } from 'src/entities/card-assignees.entity';
@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity, MembersEntity, CardsEntity, CardAssigneesEntity])],
  controllers: [EventsController],
  providers: [EventsGateway, EventsService],
  exports: [EventsGateway]
})
export class EventsModule {}
