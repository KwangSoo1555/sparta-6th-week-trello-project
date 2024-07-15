import { PickType } from "@nestjs/swagger";
import { CardCommentsEntity } from "src/entities/card-comments.entity";

export class UpdateCardCommentDto extends PickType(CardCommentsEntity, ['content']){
}