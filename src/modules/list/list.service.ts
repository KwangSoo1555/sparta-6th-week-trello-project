import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";

import { ListsEntity } from "src/entities/lists.entity";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { UpdateListOrderDto } from "./dto/update-list-order.dto";
import { MESSAGES } from "src/common/constants/messages.constant";

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListsEntity) private readonly listRepository: Repository<ListsEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async createList(createListDto: CreateListDto, boardId: number) {
    const list = { ...createListDto, boardId };
    const newList = await this.listRepository.save(list);

    return newList;
  }

  async findAllLists(): Promise<ListsEntity[]> {
    return await this.listRepository.find({
      order: {
        createdAt: "ASC",
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

  async deleteList(id: number) {
    return await this.listRepository.delete({ id });
  }

  // 카드 순서 옮기기
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

    return lists;
  }
}

//  // 리스트 순서이동
//  async updateOrderList(listIdIndex: number, updateListOrderDto: UpdateListOrderDto) {
//   const { newPositionId } = updateListOrderDto;

//   const lists = await this.listRepository.find({
//     order: { orderIndex: "ASC" },
//   });

//   // for (let i = 0; i < lists.length; i++) {
//   //   lists[i].orderIndex = i;
//   //   await this.listRepository.save(lists[i]);
//   // }

//   const currentIndex = lists[listIdIndex];

//   lists.splice(listIdIndex, 1);
//   lists.splice(newPositionId, 0, currentIndex);

//   // orderIndex를 순서대로 다시 초기화
//   for (let i = 0; i < lists.length; i++) {
//     lists[i].orderIndex = i;
//     await this.listRepository.save(lists[i]);
//   }

//   // orderIndex를 기준으로 정렬된 리스트 반환
//   // const updatedLists = await this.listRepository.find({
//   //   order: { orderIndex: "ASC" },
//   // });

//   return lists;
// }
