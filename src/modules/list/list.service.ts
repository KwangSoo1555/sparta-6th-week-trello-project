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
    // 1. order index 를 내림차순으로 가장 앞에 있는 놈을 앞으로 끄집어낸다 (findOnd 에서 order 내림차순 후 return)
    // 2. 1번에서 나온 놈이 모든 리스트 중에서 제일 큰놈임
    // 3. 2번에서 나온 놈의 order index 를 + 1 해준다
    // 4. 3번에서 나온 놈을 저장한다
    // 5. 아무 리스트도 없을 때 예외처리 해줘야 되고
  }
  //orderIndex 기준으로 내림차순으로 정렬하면 가장 첫번째에 있는 (find(1) list의 orderIndex를 조회하여 새로 생성되는 list의 orderIndex에 +1 해주고
  //리스트가 하나도 없다면 default값으로 0을 준다
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
    const findList = await this.listRepository.findOne({ where: { id } });
    if (!findList) {
      throw new NotFoundException(MESSAGES.LIST.NOT_EXISTS);
    }
    await this.listRepository.delete({ id });
    const newlists = await this.listRepository.find({ order: { orderIndex: "ASC" } });
    for (let i = 0; i < newlists.length; i++) {
      newlists[i].orderIndex = i;
      await this.listRepository.save(newlists[i]);
    }
  }

  // 리스트 순서이동
  async updateOrderList(listIdIndex: number, updateListOrderDto: UpdateListOrderDto) {
    const { newPositionId } = updateListOrderDto;

    const lists = await this.listRepository.find({
      order: { orderIndex: "ASC" },
    });

    // for (let i = 0; i < lists.length; i++) {
    //   lists[i].orderIndex = i;
    //   await this.listRepository.save(lists[i]);
    // }

    const currentIndex = lists[listIdIndex];

    lists.splice(listIdIndex, 1);
    lists.splice(newPositionId, 0, currentIndex);

    // orderIndex를 순서대로 다시 초기화
    for (let i = 0; i < lists.length; i++) {
      lists[i].orderIndex = i;
      await this.listRepository.save(lists[i]);
    }

    // orderIndex를 기준으로 정렬된 리스트 반환
    // const updatedLists = await this.listRepository.find({
    //   order: { orderIndex: "ASC" },
    // });

    return lists;
  }

  // async updateOrderList(listIdIndex: number, updateListOrderDto: UpdateListOrderDto) {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     const { newPositionId } = updateListOrderDto;

  //     const lists = await this.listRepository.find({
  //       order: { id: "ASC" },
  //     });

  //     for (let i = 0; i < lists.length; i++) {
  //       lists[i].orderIndex = i;
  //       await this.listRepository.save(lists[i]);
  //     }

  //     const currentIndex = lists[listIdIndex];

  //     lists.splice(listIdIndex, 1);
  //     lists.splice(newPositionId, 0, currentIndex);

  //     // orderIndex를 순서대로 다시 초기화
  //     for (let i = 0; i < lists.length; i++) {
  //       lists[i].orderIndex = i + 1; // 1부터 시작하도록 설정
  //       await this.listRepository.save(lists[i]);
  //     }

  //     // orderIndex를 기준으로 정렬된 리스트 반환
  //     const updatedLists = await this.listRepository.find({
  //       order: { orderIndex: "ASC" },
  //     });

  //     await queryRunner.commitTransaction();

  //     return updatedLists;
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
}
