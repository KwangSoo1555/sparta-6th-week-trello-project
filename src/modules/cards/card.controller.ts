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
import { SwapCardDto } from "./dtos/swap.cardDto";

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

  // 카드 내용 변경
  @Patch(":cardId")
  async update(
    @Param("listId", ParseIntPipe) listId: number,
    @Param("cardId", ParseIntPipe) cardId: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return await this.cardService.update(listId, cardId, updateCardDto);
  }

  // 순서이동;
  @Patch(":orderIndex/order")
  async updateOrder(
    @Param("listId", ParseIntPipe) listId: number,
    @Param("orderIndex", ParseIntPipe) orderIndex: number,
    @Body() swapCardDto: SwapCardDto,
  ) {
    return await this.cardService.updateOrder(listId, orderIndex, swapCardDto);
  }

  // 카드 삭제 API
  @Delete("delete/:cardId")
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
}
