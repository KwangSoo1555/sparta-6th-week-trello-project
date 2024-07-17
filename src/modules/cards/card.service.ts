import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CardsEntity } from "src/entities/cards.entity";
import { Repository } from "typeorm";
import { CreateCardDto } from "./dtos/create.cardDto";
import { UpdateCardDto } from "./dtos/update.cardDto";
import { CardAssigneesEntity } from "src/entities/card-assignees.entity";
import { MESSAGES } from "src/common/constants/messages.constant";
import { ListsEntity } from "src/entities/lists.entity";
import { SwapCardDto } from "./dtos/swap.cardDto";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardsEntity)
    private readonly cardRepository: Repository<CardsEntity>,
    @InjectRepository(CardAssigneesEntity)
    private readonly cardAssigneeRepository: Repository<CardAssigneesEntity>,
    @InjectRepository(ListsEntity)
    private readonly listRepository: Repository<ListsEntity>,
  ) {}

  // 카드 생성 API
  // id는 생성 되고 나서 발생하는 거니까 list id를 넣는다.
  async create(createCardDto: CreateCardDto, listId: number) {
    await this.findByListId(listId);

    const newItem = { ...createCardDto, listId };
    const newCard = await this.cardRepository.save(newItem);

    return newCard;
  }

  async findByListId(listId: number) {
    const existingList = await this.cardRepository.findOne({
      where: {
        listId,
      },
    });
    if (!existingList) {
      throw new BadRequestException(MESSAGES.CARD.LIST.NOT_EXISTS);
    }

    return existingList;
  }

  async findByCardId(cardId: number) {
    const existingCard = await this.cardRepository.findOne({
      where: {
        id: cardId,
      },
    });

    if (!existingCard) {
      throw new BadRequestException(MESSAGES.CARD.NOT_EXISTS);
    }
    return existingCard;
  }

  // 수정할떄 member 예외처리
  // 카드 수정 API
  async update(listId: number, cardId: number, updateCardDto: UpdateCardDto) {
    // 카드리스트가 존재하는지 확인
    await this.findByListId(listId);
    const existingCard = await this.findByCardId(cardId);

    // 카드 내용 수정 - 1
    existingCard.cardTitle = updateCardDto.cardTitle;
    existingCard.content = updateCardDto.content;
    existingCard.backgroundColor = updateCardDto.backgroundColor;

    // 카드 내용 수정 - 2
    const updatedCard = await this.cardRepository.save(existingCard);

    // 작업자에 대한것은 2차적으로
    // Dto를 통해서 받은 변경하려는 멤버의 숫자 선언
    const inputCardMember = updateCardDto.cardMember;

    // 카드에 어사이니가 존재하는지 확인
    let cardMember = await this.cardAssigneeRepository.findOne({
      where: { cardId: cardId },
    });

    //작업자 데이터가 있으면 수정 // 없으면 생성작업자 할당 및 변경
    if (!cardMember) {
      cardMember = this.cardAssigneeRepository.create({
        cardId: cardId,
        memberId: inputCardMember,
      });
    } else {
      cardMember.memberId = updateCardDto.cardMember;
    }

    const saveCardMemberData = await this.cardAssigneeRepository.save(cardMember);

    // 분리1 분리2 해서 각자 맞게 저장하고 그 변수들을 합쳐서 리턴..
    return { ...updatedCard, ...saveCardMemberData };
  }

  // 카드 삭제 API
  async delete(listId: number, cardId: number) {
    await this.findByListId(listId);

    return this.cardRepository.delete(cardId);
  }

  // 카드 순서 이동 API
  async swapCardUpdate(listId: number, cardId: number, swapCardDto: SwapCardDto) {}
}
