import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ListsEntity } from "src/entities/lists.entity";

import { RESPOND_CONSTANT } from "src/common/constants/respond.contant";

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListsEntity) private readonly listRepository: Repository<ListsEntity>,
  ) {}

  async create(createListDto: CreateListDto, boardId: number) {
    const list = { ...createListDto, boardId };
    const newList = await this.listRepository.save(list);

    return newList;
  }

  async findAll(): Promise<ListsEntity[]> {
    return await this.listRepository.find({
      order: {
        createdAt: "ASC",
      },
    });
  }

  async update(id: number, updateListDto: UpdateListDto): Promise<ListsEntity> {
    const { title } = updateListDto;
    const list = await this.listRepository.findOne({ where: { id } });
    if (!list) {
      throw new NotFoundException(RESPOND_CONSTANT.LIST.NOT_FOUND_LIST);
    }
    list.title = title !== undefined ? title : list.title;
    const updateList = await this.listRepository.save(list);
    return updateList;
  }

  async delete(id: number) {
    return await this.listRepository.delete({ id });
  }
}
