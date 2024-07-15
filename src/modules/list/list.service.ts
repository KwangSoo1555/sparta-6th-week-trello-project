import { Injectable, NotFoundException } from "@nestjs/common";
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
    // const list = { ...createListDto, boardId };
    // const newList = await this.listRepository.save(list);
    const list = new ListsEntity();
    list.boardId = boardId;
    list.title = createListDto.title;
    list.nextIndex = (await this.listRepository.count({ where: { boardId } })) + 1;
    list.addNode(list.nextIndex);

    let currentNextIndex = 1;
    while (await this.listRepository.findOne({ where: { nextIndex: currentNextIndex, boardId } })) {
      currentNextIndex++;
    }
    list.nextIndex = currentNextIndex;

    const newList = await this.listRepository.save(list);

    return newList;
  }

  async findOne(id: number): Promise<ListsEntity> {
    const list = await this.listRepository.findOne({ where: { id } });
    if (!list) {
      throw new NotFoundException("해당 리스트가 존재하지 않습니다.");
    }
    return list;
  }

  async addNode(listId: number, value: number): Promise<ListsEntity> {
    const list = await this.findOne(listId);
    list.addNode(list.nextIndex + 1);
    list.nextIndex++;
    return await this.listRepository.save(list);
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
      throw new NotFoundException("해당 리스트가 존재하지 않습니다.");
    }
    list.title = title !== undefined ? title : list.title;
    const updateList = await this.listRepository.save(list);
    return updateList;
  }

  // async delete(id: number) {
  //   return await this.listRepository.delete({ id });
  // }

  async delete(id: number): Promise<void> {
    const list = await this.findOne(id);
    await list.deleteAllNodes();
    await this.listRepository.delete({ id });
  }
}
