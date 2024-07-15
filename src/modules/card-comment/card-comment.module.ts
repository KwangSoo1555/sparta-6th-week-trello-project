import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardsEntity } from "src/entities/cards.entity";
import { CardCommentController } from "./card-comment.controller";
import { CardCommentService } from "./card-comment.service";
import { CardCommentsEntity } from "src/entities/card-comments.entity";
import { CardCheckListEntity } from "src/entities/card-check-list.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CardCommentsEntity, CardsEntity, CardCheckListEntity])],
  controllers: [CardCommentController],
  providers: [CardCommentService],
})
export class CardCommentModule {}
