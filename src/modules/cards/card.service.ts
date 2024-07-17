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

    const lastCard = await this.cardRepository.findOne({
      order: { orderIndex: "DESC" },
      where: { listId },
    });

    const nextOrderIndex = lastCard ? lastCard.orderIndex + 1 : 0;

    // 새로운 카드 생성, orderIndex 설정
    const newItem = { ...createCardDto, listId, orderIndex: nextOrderIndex };

    const newCard = await this.cardRepository.save(newItem);

    return newCard;
  }

  // 리스트 찾는 함수
  async findByListId(listId: number) {
    const existingList = await this.listRepository.findOne({
      where: {
        id: listId,
      },
    });

    if (!existingList) {
      throw new BadRequestException(MESSAGES.CARD.LIST.NOT_EXISTS);
    }

    return existingList;
  }

  // 카드 ID 찾는 함수
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
    // 삭제하려는 카드의 현재 리스트가 존재하는지?
    await this.findByListId(listId);

    // 카드 삭제
    await this.cardRepository.delete(cardId);

    // 카드 삭제후 DB속의 모든 카드 오름 차순으로 찾기
    const cards = await this.cardRepository.find({
      where: { listId: listId },
      order: { orderIndex: "ASC" },
    });

    // 카드 orderIndex 다시 정리
    for (let i = 0; i < cards.length; i++) {
      cards[i].orderIndex = i;

      await this.listRepository.save(cards[i]);
    }

    return;
  }

  // 카드 순서 이동 API
  // 카드 순서 옮기기
  async updateOrder(listId: number, orderIndex: number, swapCardDto: SwapCardDto) {
    const { swapCardOrderIndex, swapListIndex } = swapCardDto;

    // 카드의 현재 위치를 찾기
    await this.cardRepository.findOne({
      where: {
        orderIndex,
      },
    });

    // 현재 리스트에서 카드를 찾기
    const currentListCards = await this.cardRepository.find({
      where: { listId: listId },
      order: { orderIndex: "ASC" },
    });

    // 내 카드의 현재 위치 파악 후 배열에서 제거
    const currentIndex = currentListCards.findIndex((card) => card.orderIndex === orderIndex);
    const [removedCard] = currentListCards.splice(currentIndex, 1);

    // 카드의 리스트를 업데이트
    removedCard.listId = swapListIndex || listId;

    // 타겟 리스트에서 카드를 찾기 (현재 리스트와 타겟 리스트가 동일하면 갱신된 currentListCards 사용)
    const targetListCards = swapListIndex
      ? await this.cardRepository.find({
          where: { listId: swapListIndex },
          order: { orderIndex: "ASC" },
        })
      : currentListCards;

    // 타겟 리스트에 카드를 삽입
    targetListCards.splice(swapCardOrderIndex, 0, removedCard);

    // 타겟 리스트의 모든 카드의 orderIndex를 다시 설정
    for (let i = 0; i < targetListCards.length; i++) {
      targetListCards[i].orderIndex = i;
      await this.cardRepository.save(targetListCards[i]);
    }

    // 현재 리스트가 타겟 리스트와 다르면, 현재 리스트도 재정렬
    if (swapListIndex && swapListIndex !== listId) {
      for (let i = 0; i < currentListCards.length; i++) {
        currentListCards[i].orderIndex = i;
        await this.cardRepository.save(currentListCards[i]);
      }
    }

    return targetListCards;
  }
}
// 옮겨 간 리스트에 정렬 1

// 원래 있던 리스트에서 정렬 1

// 기존에 있었던 코드
// async updateOrder(listId: number, cardId: number, swapCardDto: SwapCardDto) {
//   // 내가 옮기려고 하는 카드의 장소 선언
//   const { swapCardIndex } = swapCardDto;

//   // 카드의 위치 찾아
//   const cards = await this.cardRepository.find({
//     where: { listId: listId },
//     order: { orderIndex: "ASC" },
//   });

//   // 내 카드의 현재 위치 파악 후 재명명
//   const currentIndex = cards[cardId];

//   cards.splice(cardId, 1);

//   cards.splice(swapCardIndex, 0, currentIndex);

//   // orderIndex를 순서대로 다시 초기화
//   for (let i = 0; i < cards.length; i++) {
//     cards[i].orderIndex = i;
//     await this.cardRepository.save(cards[i]);
//   }

//   return cards;
// }
