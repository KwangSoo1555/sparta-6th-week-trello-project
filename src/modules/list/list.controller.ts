import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from "@nestjs/common";

import { ListService } from "./list.service";

import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { UpdateListOrderDto } from "./dto/update-list-order.dto";
import { MESSAGES } from "src/common/constants/messages.constant";

@Controller("boards/:boardId/lists")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async createList(@Body() createListDto: CreateListDto, @Param("boardId") boardId: number) {
    const list = await this.listService.createList(createListDto, boardId);

    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.LIST.CREATE_SUCCEED,
      list,
    };
  }

  @Get()
  async findAllLists() {
    return await this.listService.findAllLists();
  }

  @Patch(":id")
  async updateList(@Param("id") id: number, @Body() updateListDto: UpdateListDto) {
    return await this.listService.updateList(id, updateListDto);
  }

  @Delete(":id")
  async deleteList(@Param("id") id: string) {
    await this.listService.deleteList(+id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.LIST.DELETE_SUCCEED,
      id,
    };
  }

  @Patch(":listIdIndex/order")
  async updateCards(
    @Param("listIdIndex") listIdIndex: number,
    @Body() updateListOrderDto: UpdateListOrderDto,
  ) {
    return await this.listService.updateOrderList(listIdIndex, updateListOrderDto);
  }
}
