import { Body, Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { EventsService } from "./events.service";
import { RequestUserAndToken } from "src/common/custom/decorator/user-request-jwt";
import { JwtAccessGuards } from "../auth/jwt/jwt-strategy.service";
import { UsersEntity } from "src/entities/users.entity";
import { NotificationUpdate } from "./dto/notification.update.dto";

import { MESSAGES } from "src/common/constants/messages.constant";
@Controller("notification")
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  @UseGuards(JwtAccessGuards)
  async getNotification(
    @Body() notificationUpdate: NotificationUpdate,
    @Query("limit") limit: string,
    @RequestUserAndToken() { user: { id: userId } }: { user: Pick<UsersEntity, "id"> },
  ) {
    let limitNumber = parseInt(limit, 10);
    if (isNaN(limitNumber) || limitNumber <= 0) {
      limitNumber = 10;
    }
    const data = await this.eventService.getNotification(
      notificationUpdate.boardId,
      userId,
      limitNumber,
    );
    return { message: MESSAGES.EVENTS.ALERT_VIEW_SUCCED, data };
  }
}
