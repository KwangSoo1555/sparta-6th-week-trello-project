import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CardsEntity } from "src/entities/cards.entity";
import { Repository } from "typeorm";
import { CreateCardDto } from "./dtos/create.cardDto";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardsEntity)
    private readonly cardRepository: Repository<CardsEntity>,
  ) {}

  // 카드 생성 API
  // id는 생성 되고 나서 발생하는 거니까 list id를 넣는다.
  async create(createCardDto: CreateCardDto, listId: number) {
    const newItem = { ...createCardDto, listId };
    const newCard = await this.cardRepository.save(newItem);

    return newCard;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  delete(id: number) {
    return `this action returns a #${id} card`;
  }
}
