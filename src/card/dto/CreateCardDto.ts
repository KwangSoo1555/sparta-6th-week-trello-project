import { PickType } from "@nestjs/swagger";
import { CardEntity } from "src/entities/card.entity";

export class CreateCardDto extends PickType(CardEntity, ["listId"]) {}
