import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from "@nestjs/common";
import { ListService } from "./list.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { RESPOND_CONSTANT } from "src/common/constants/respond.contant";

@Controller("boards/:boardId/lists")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async create(@Body() createListDto: CreateListDto, @Param("boardId") boardId: number) {
    const list = await this.listService.create(createListDto, boardId);

    return {
      statusCode: HttpStatus.CREATED,
      message: RESPOND_CONSTANT.LIST.CREATE,
      list,
    };
  }

  @Get()
  async findAll() {
    return await this.listService.findAll();
  }

  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateListDto: UpdateListDto) {
    return await this.listService.update(id, updateListDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.listService.delete(+id);
    return {
      statusCode: HttpStatus.OK,
      message: RESPOND_CONSTANT.LIST.REMOVE,
      id,
    };
  }
}
