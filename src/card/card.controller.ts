import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/CreateCardDto";

@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // 내가 궁금한 것
  // listId는 애당초 가지고 있는지?
  // 로그인 한 사람이 현재 리스트에서 카드를 만드니까 현재 리스트의 id가 자동으로 입력이 되는것인지?

  @Post("lists/:listId/cards")
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardService.create(createCardDto);
  }

  // @Patch(":id")
  // update(@Param("id") id: number, @Body() updateCard: UpdateCard) {
  //   return this.cardService.update(+id, updateCard);
  // }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.cardService.delete(+id);
  }

  // 순서이동
  // @Patch(":id")
}
