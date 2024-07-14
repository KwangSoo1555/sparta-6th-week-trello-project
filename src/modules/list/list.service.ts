import { Injectable } from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ListsEntity } from "src/entities/lists.entity";

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

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    console.log(updateListDto);
    return `This action updates a #${id} list`;
  }

  delete(id: number) {
    return `This action removes a #${id} list`;
  }
}
