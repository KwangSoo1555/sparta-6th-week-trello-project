import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from "@nestjs/common";
import { ListService } from "./list.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { MESSAGES } from "src/common/constants/messages.constant";
import { UpdateListOrderDto } from "./dto/update-list-order.dto";

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

  @Get(":id")
  async findOneList(@Param("id") id: number) {
    const list = await this.listService.findOneList(id);
    return list;
  }

  @Get()
  async findAllList() {
    return await this.listService.findAllList();
  }

  @Patch(":id")
  async updateList(@Param("id") id: number, @Body() updateListDto: UpdateListDto) {
    return await this.listService.updateList(id, updateListDto);
  }

  @Delete(":id")
  async removeList(@Param("id") id: string) {
    await this.listService.deleteList(+id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.LIST.DELETE_SUCCEED,
      id,
    };
  }

  // @Patch(":listId/order")
  // async updateCards(
  //   @Param("listId") listId: number,
  //   @Body() updateListOrderDto: UpdateListOrderDto,
  // ) {
  //   return await this.listService.updateListOrderDto(listId, updateListOrderDto);
  // }
}
