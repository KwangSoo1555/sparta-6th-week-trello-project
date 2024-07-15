import { Body, Controller, Param, Post } from "@nestjs/common";
import { CardCommentService } from "./card-comment.service";
import { RequestUserAndToken } from "src/common/custom/user-request-jwt";
import { CreateCardCommentDto } from "./dto/card-comment.dto";
import { UsersEntity } from "src/entities/users.entity";

@Controller("cards")
export class CardCommentController {
  constructor(private readonly cardCommentService: CardCommentService) {}

  @Post(":cardId/content")
  commentCreate(
    @Param("cardId") cardId: number,
    @Body() createCardCommentDto: CreateCardCommentDto,
    @RequestUserAndToken() user: UsersEntity,
  ) {
    const id =1
    return this.cardCommentService.commentCreate(cardId, createCardCommentDto.content, id);
  }
}