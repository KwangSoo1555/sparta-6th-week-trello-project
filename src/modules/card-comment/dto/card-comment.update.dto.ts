import { PickType } from "@nestjs/swagger";
import { CardCommentsEntity } from "src/entities/card-comments.entity";

export class CreateCardCommentDto extends PickType(CardCommentsEntity, ["content"]) {}
