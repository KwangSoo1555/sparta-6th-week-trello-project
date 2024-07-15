import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { CardCommentService } from "./card-comment.service";
import { RequestUserAndToken } from "src/common/custom/user-request-jwt";
import { UsersEntity } from "src/entities/users.entity";
import { CreateCardCommentDto } from "./dto/card-comment.update.dto";
import { UpdateCardCommentDto } from "./dto/card-comment.create.dto";

@Controller("cards")
export class CardCommentController {
  constructor(private readonly cardCommentService: CardCommentService) {}

  @Post(":cardId/content")
  commentCreate(
    @Param("cardId") cardId: number,
    @Body() createCardCommentDto: CreateCardCommentDto,
    @RequestUserAndToken() user: Pick<UsersEntity, "id">,
  ) {
    return this.cardCommentService.commentCreate(cardId, createCardCommentDto.content, user.id);
  }

  @Patch("comment/:commentId")
  async commentPatch(
    @Param("commentId") commentId: number,
    @Body() updateCardCommentDto: UpdateCardCommentDto,
    @RequestUserAndToken() user: Pick<UsersEntity, "id">,
  ) {
    await this.cardCommentService.commentPatch(commentId, user.id, updateCardCommentDto.content);
    return { message: "댓글이 성공적으로 수정되었습니다." };
  }

  @Delete("comment/:commentId")
  async commentDelete(
    @Param("commentId") commentId: number,
    @RequestUserAndToken() user: Pick<UsersEntity, "id">,
  ) {
    await this.cardCommentService.commentDelete(user.id, commentId);
    return { message: "댓글을 성공적으로 삭제하였습니다." };
  }
}
