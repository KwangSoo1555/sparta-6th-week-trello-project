import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
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
    return this.cardCommentService.commentCreate(cardId, createCardCommentDto.content, user.id);
  }

  @Delete("comment/:commentId")
  async commentDelete(@Param("commentId") commentId: number, @RequestUserAndToken() user: UsersEntity) {
    await this.cardCommentService.commentDelete(user.id, commentId);
    return { message: "댓글을 성공적으로 삭제하였습니다." };
  }
}