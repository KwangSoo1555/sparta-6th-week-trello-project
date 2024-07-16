import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ListsEntity } from "src/entities/lists.entity";
import { CardsEntity } from "src/entities/cards.entity";
import { MESSAGES } from "src/common/constants/messages.constant";
@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListsEntity) private readonly listRepository: Repository<ListsEntity>,
    @InjectRepository(CardsEntity) private readonly cardRepository: Repository<CardsEntity>,
  ) {}

  async create(createListDto: CreateListDto, boardId: number) {
    const list = new ListsEntity();
    list.boardId = boardId;
    list.title = createListDto.title;
    return await this.listRepository.save(list);
  }

  async findOne(id: number): Promise<ListsEntity> {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: ["card"],
    });
    if (!list) {
      throw new NotFoundException({ message: MESSAGES.LIST.NOT_EXISTS });
    }
    list.card = await this.cardRepository.find({
      where: { listId: list.id },
      select: ["content"],
    });
    return list;
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
      throw new NotFoundException(MESSAGES.LIST.NOT_EXISTS);
    }
    list.title = title !== undefined ? title : list.title;
    const updateList = await this.listRepository.save(list);
    return updateList;
  }

  // async delete(id: number) {
  //   return await this.listRepository.delete({ id });
  // }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.listRepository.delete({ id });
  }
}
