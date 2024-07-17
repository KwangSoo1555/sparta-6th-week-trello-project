import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { UpdateListOrderDto } from "./dto/update-list-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DataSource } from "typeorm";
import { ListsEntity } from "src/entities/lists.entity";
import { CardsEntity } from "src/entities/cards.entity";
import { MESSAGES } from "src/common/constants/messages.constant";
import { ApiBadGatewayResponse } from "@nestjs/swagger";
@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListsEntity) private readonly listRepository: Repository<ListsEntity>,
    @InjectRepository(CardsEntity) private readonly cardRepository: Repository<CardsEntity>,
  ) {}

  async createList(createListDto: CreateListDto, boardId: number) {
    const list = new ListsEntity();
    list.boardId = boardId;
    list.title = createListDto.title;
    return await this.listRepository.save(list);
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
      select: ["content"],
    });
    return list;
  }

  async findAllList(): Promise<ListsEntity[]> {
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

  // async delete(id: number) {
  //   return await this.listRepository.delete({ id });
  // }

  async deleteList(id: number): Promise<void> {
    await this.findOneList(id);
    await this.listRepository.delete({ id });
  }
}
//   async updateOrderList(listId: number, updateListOrderDto: UpdateListOrderDto) {
//     const queryRunner = this.datasorce.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       const { newPositionId } = updateListOrderDto;
//       const listToMove = await this.listRepository.findOne({ where: { id: listId } });
//       if (!listToMove) {
//         throw new NotFoundException(MESSAGES.LIST.NOT_EXISTS);
//       }

//       const lists = await this.listRepository.find({
//         order: { id: "ASC" },
//       });

//       const currentIndex = lists.findIndex((list) => list.id === listId);
//       console.log(currentIndex);
//       if (currentIndex === -1) {
//         throw new NotFoundException(MESSAGES.LIST.NOT_EXISTS);
//       }
//       // 여기가 60번째 줄에서 정렬된 녀석을 토대로 64번째 줄에서 찾은 녀석 부터 1개의 idx 삭제한다. 69번째 줄의 효과
//       lists.splice(currentIndex, 1);
//       lists.splice(newPositionId - 1, 0, listToMove);

//       for (let i = 0; i < lists.length; i++) {
//         lists[i].id = i + 1;
//         await this.listRepository.save(lists[i]);
//       }
//       const updateLists = await this.listRepository.find({
//         order: { id: "ASC" },
//       });
//       return updateLists;

//       await queryRunner.commitTransaction();

//       return lists;
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   }
// }
