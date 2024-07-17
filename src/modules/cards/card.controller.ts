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
import { MESSAGES } from "src/common/constants/messages.constant";

@Controller("lists/:listId/cards")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(
    @Body() createCardDto: CreateCardDto,
    @Param("listId", ParseIntPipe) listId: number,
  ) {
    const data = await this.cardService.create(createCardDto, listId);
    return {
      message: MESSAGES.CARD.CREATE_SUCCEED,
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
      message: MESSAGES.CARD.DELETE_SUCCEED,
      status: HttpStatus.OK,
      data,
    };
  }

  // 순서이동
  @Patch(":id")
  async updateOrder(
    @Param("listId", ParseIntPipe) listId: number,
    @Param("cardId", ParseIntPipe) cardId: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return await this.cardService.updateOrder(listId, cardId, updateCardDto);
  }
}
