import { BadRequestException, Injectable } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CardCommentsEntity } from "src/entities/card-comments.entity";
import { CardsEntity } from "src/entities/cards.entity";
import { MESSAGES } from "src/common/constants/messages.constant";

@Injectable()
export class CardCommentService {
  constructor(
    @InjectRepository(CardsEntity)
    private readonly cardRepository: Repository<CardsEntity>,
    @InjectRepository(CardCommentsEntity)
    private readonly cardCommentRepository: Repository<CardCommentsEntity>,
  ) {}

  async commentCreate(cardId: number, content: string, userId: number) {
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!card) {
      throw new BadRequestException(MESSAGES.CARD.NOT_CARD.CARD_NOT_FOUND);
    }
    const comment = await this.cardCommentRepository.save({
      cardId: cardId,
      userId: userId,
      content: content,
    });

    return comment;
  }
  
  async commentDelete(userId: number, commentId: number) {
    const data = await this.cardCommentRepository.findOne({
      where: {
        id: commentId,
      },
    });
    if (!data) {
      throw new BadRequestException("없는 댓글입니다.");
    }
    const comment = await this.cardCommentRepository.findOne({
      where: {
        id: commentId,
        userId: userId,
      },
    });
    if (!comment) {
      throw new BadRequestException("댓글을 삭제 할 권한이 없습니다.");
    }
    return this.cardCommentRepository.delete(comment.id);
  }
}