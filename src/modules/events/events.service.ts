import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CardAssigneesEntity } from "src/entities/card-assignees.entity";
import { MembersEntity } from "src/entities/members.entity";
import { NotificationEntity } from "src/entities/notification.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(MembersEntity)
    private readonly memberRepository: Repository<MembersEntity>,
    @InjectRepository(CardAssigneesEntity)
    private readonly cardAssigneesRepository: Repository<CardAssigneesEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async getNotification(boardId: number, userId: number, limit:number) {
    const userData = await this.memberRepository.findOne({
      where: { boardId, userId },
    });
    console.log(userData)
    const notificationData = await this.notificationRepository.find({
      where: { memberId: userData.id },
      order: { createdAt: "DESC" },
      take: +limit
    });

    return notificationData
  }
}
