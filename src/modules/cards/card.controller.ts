import { Body, Controller, Delete, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dtos/create.cardDto";

@Controller("lists/:listId/cards")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // 내가 궁금한 것
  // listId는 애당초 가지고 있는지?
  // 로그인 한 사람이 현재 리스트에서 카드를 만드니까 현재 리스트의 id가 자동으로 입력이 되는것인지?

  @Post()
  async create(
    @Body() createCardDto: CreateCardDto,
    @Param("listId", ParseIntPipe) listId: number,
  ) {
    return await this.cardService.create(createCardDto, listId);
  }

  // @Param("listId") listId: number

  // @Patch(":id")
  // update(@Param("id") id: number, @Body() updateCard: UpdateCard) {
  //   return this.cardService.update(+id, updateCard);
  // }

  @Delete(":id")
  // ParseIntPipe = number가 아닌 타입을 가져올 때 자동으로 숫자로 변환시켜주는 것
  delete(@Param("id", ParseIntPipe) id) {
    return this.cardService.delete(id);
  }

  // 순서이동
  // @Patch(":id")
}
