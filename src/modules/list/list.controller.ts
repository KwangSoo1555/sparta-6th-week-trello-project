import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from "@nestjs/common";
import { ListService } from "./list.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";

@Controller("boards/:boardId/lists")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async create(@Body() createListDto: CreateListDto, @Param("boardId") boardId: number) {
    const list = await this.listService.create(createListDto, boardId);

    return {
      statusCode: HttpStatus.CREATED,
      message: "리스트가 생성되었습니다.",
      list,
    };
  }

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.listService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.listService.delete(+id);
  }
}
