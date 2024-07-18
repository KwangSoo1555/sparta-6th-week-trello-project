import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";

import { ListsEntity } from "src/entities/lists.entity";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { UpdateListOrderDto } from "./dto/update-list-order.dto";
import { MESSAGES } from "src/common/constants/messages.constant";
import { CardsEntity } from "src/entities/cards.entity";

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListsEntity) private readonly listRepository: Repository<ListsEntity>,
    private readonly dataSource: DataSource,
    @InjectRepository(CardsEntity) private readonly cardRepository: Repository<CardsEntity>,
  ) {}

  async createList(createListDto: CreateListDto, boardId: number) {
    const list = { ...createListDto, boardId };

    const lastList = await this.listRepository.findOne({
      where: { boardId },
      order: { orderIndex: "DESC" },
    });
    // lists를 찾아서 orderIndex가 없으면 생성 // 있으면 orderIndex의 가장 큰 숫자 + 1
    const newOrderIndex = lastList ? lastList.orderIndex + 1 : 0;
    const newList = await this.listRepository.save({
      ...list,
      orderIndex: newOrderIndex,
    });

    return newList;
  }
  
  async findOneList(id: number): Promise<ListsEntity> {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: ["card"],
    });
    if (!list) {
      throw new NotFoundException({ message: MESSAGES.LIST.NOT_EXISTS });
    }
    list.card = await this.cardRepository.find({
      where: { listId: list.id },
      order: { orderIndex: "ASC" },
      select: ["content"],
    });
    return list;
  }

  async findAllLists(): Promise<ListsEntity[]> {
    return await this.listRepository.find({
      order: {
        orderIndex: "ASC",
      },
    });
  }

  async updateList(id: number, updateListDto: UpdateListDto): Promise<ListsEntity> {
    const { title } = updateListDto;
    const list = await this.listRepository.findOne({ where: { id } });
    if (!list) {
      throw new NotFoundException(MESSAGES.LIST.NOT_EXISTS);
    }
    list.title = title !== undefined ? title : list.title;
    const updateList = await this.listRepository.save(list);
    return updateList;
  }

  //삭제시 orderIndex순으로 다시 초기화.
  async deleteList(id: number) {
    return await this.listRepository.delete({ id });
  }

  async updateOrderList(listIdIndex: number, updateListOrderDto: UpdateListOrderDto) {
    const { newPositionId } = updateListOrderDto;

    const lists = await this.listRepository.find({
      order: { orderIndex: "ASC" },
    });

    const currentIndex = lists[listIdIndex];

    lists.splice(listIdIndex, 1);
    lists.splice(newPositionId, 0, currentIndex);

    // orderIndex를 순서대로 다시 초기화
    for (let i = 0; i < lists.length; i++) {
      lists[i].orderIndex = i;
      await this.listRepository.save(lists[i]);
    }

    // orderIndex를 기준으로 정렬된 리스트 반환
    const updatedLists = await this.listRepository.find({
      order: { orderIndex: "ASC" },
    });

    return updatedLists;
  }
}
