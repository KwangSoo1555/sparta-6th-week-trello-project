import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CardCommentService } from "./card-comment.service";
import { RequestUserAndToken } from "src/common/custom/decorator/user-request-jwt";
import { UsersEntity } from "src/entities/users.entity";
import { CreateCardCommentDto } from "./dto/card-comment.update.dto";
import { UpdateCardCommentDto } from "./dto/card-comment.create.dto";
import { JwtAccessGuards } from "../auth/jwt/jwt-strategy.service";

@UseGuards(JwtAccessGuards)
@Controller("cards")
export class CardCommentController {
  constructor(private readonly cardCommentService: CardCommentService) {}

  @Post(":cardId/content")
  commentCreate(
    @Param("cardId") cardId: number,
    @Body() createCardCommentDto: CreateCardCommentDto,
    @RequestUserAndToken() { user: { id: userId } }: { user: Pick<UsersEntity, "id"> },
  ) {
    return this.cardCommentService.commentCreate(cardId, createCardCommentDto.content, userId);
  }

  @Patch("comment/:commentId")
  async commentPatch(
    @Param("commentId") commentId: number,
    @Body() updateCardCommentDto: UpdateCardCommentDto,
    @RequestUserAndToken() { user: { id: userId } }: { user: Pick<UsersEntity, "id"> },
  ) {
    await this.cardCommentService.commentPatch(commentId, userId, updateCardCommentDto.content);
    return { message: "댓글이 성공적으로 수정되었습니다." };
  }

  @Delete("comment/:commentId")
  async commentDelete(
    @Param("commentId") commentId: number,
    @RequestUserAndToken() { user: { id: userId } }: { user: Pick<UsersEntity, "id"> },
  ) {
    await this.cardCommentService.commentDelete(userId, commentId);
    return { message: "댓글을 성공적으로 삭제하였습니다." };
  }

  @Patch(":cardId/dead-line")
  async dateTimeCard(@Param("cardId") cardId: number, @Body("dataTime") dataTime: string) {
    await this.cardCommentService.dateTimeCard(cardId, dataTime);
    return { message: "카드에 날짜 수정되었습니다." };
  }

  @Post(":cardId/check-list")
  async cardCheckList(@Param("cardId") cardId: number, @Body("content") content: string) {
    const data = await this.cardCommentService.cardCheckList(cardId, content);
    return { message: "체크리스트가 추가되었습니다.", data };
  }

  @Patch("check-lists/:checkListId")
  async checkList(@Param("checkListId") checkListId: number) {
    const data = await this.cardCommentService.checkList(checkListId);
    return { message: "체크리스트 변경사항되었습니다.", data };
  }
}
