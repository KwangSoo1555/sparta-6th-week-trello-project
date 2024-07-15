import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardsEntity } from "src/entities/cards.entity";
import { CardCommentController } from "./card-comment.controller";
import { CardCommentService } from "./card-comment.service";
import { CardCommentsEntity } from "src/entities/card-comments.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CardCommentsEntity, CardsEntity])],
  controllers: [CardCommentController],
  providers: [CardCommentService],
})
export class CardCommentModule {}
