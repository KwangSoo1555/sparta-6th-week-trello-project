import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dtos/create.cardDto";
import { UpdateCardDto } from "./dtos/update.cardDto";

@Controller("lists/:listId/cards")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // 내가 궁금한 것
  // listId는 애당초 가지고 있는지?
  // 로그인 한 사람이 현재 리스트에서 카드를 만드니까 현재 리스트의 id가 자동으로 입력이 되는것인지?

  // 야매 성공 listId를 자동을 받아오는 코드를 service에서 만들어서 넣어야함. <- 이거 길현님이 하실 것
  @Post()
  async create(
    @Body() createCardDto: CreateCardDto,
    @Param("listId", ParseIntPipe) listId: number,
  ) {
    const data = await this.cardService.create(createCardDto, listId);
    return {
      message: "카드가 성공적으로 생성되었습니다.",
      status: HttpStatus.CREATED,
      data,
    };
  }

  @Patch(":cardId")
  async update(
    @Param("listId", ParseIntPipe) listId: number,
    @Param("cardId", ParseIntPipe) cardId: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return await this.cardService.update(cardId, listId, updateCardDto);
  }

  // 카드 삭제 API
  @Delete(":cardId")
  // ParseIntPipe = number가 아닌 타입을 가져올 때 자동으로 숫자로 변환시켜주는 것
  async delete(
    @Param("listId", ParseIntPipe) listId: number,
    @Param("cardId", ParseIntPipe) cardId: number,
  ) {
    const data = await this.cardService.delete(listId, cardId);
    return {
      message: "카드가 성공적으로 삭제되었습니다.",
      status: HttpStatus.OK,
      data,
    };
  }

  // 순서이동
  // @Patch(":id")
}
