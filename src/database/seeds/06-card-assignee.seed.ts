import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CardAssigneesEntity } from "../../entities/card-assignees.entity";
import { CardsEntity } from "../../entities/cards.entity";
import { MembersEntity } from "../../entities/members.entity";

export class CardAssigneesSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const cardRepository = dataSource.getRepository(CardsEntity);
    const memberRepository = dataSource.getRepository(MembersEntity);
    const cardAssigneesRepository = dataSource.getRepository(CardAssigneesEntity);

    const cards = await cardRepository.find();
    const members = await memberRepository.find();

    const data = [];

    for (let i = 0; i < 100; i++) {
      const card = cards[Math.floor(Math.random() * cards.length)];
      const member = members[Math.floor(Math.random() * members.length)];

      // 추가: card와 member가 정의되어 있지 않으면 continue하여 다음 반복으로 넘어감
      if (!card || !member) {
        continue;
      }

      data.push({
        cardId: card.id,
        memberId: member.id,
        card,
        member,
      });
    }

    await cardAssigneesRepository.save(data);
  }
}
