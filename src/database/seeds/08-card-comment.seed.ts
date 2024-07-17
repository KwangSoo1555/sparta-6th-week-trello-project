import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CardCommentsEntity } from "../../entities/card-comments.entity";
import { CardsEntity } from "../../entities/cards.entity";
import { faker } from "@faker-js/faker";
import { MembersEntity } from "../../entities/members.entity";

export class CardCommentsSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const memberRepository = dataSource.getRepository(MembersEntity);
    const cardRepository = dataSource.getRepository(CardsEntity);
    const cardCommentsRepository = dataSource.getRepository(CardCommentsEntity);

    const members = await memberRepository.find();
    const cards = await cardRepository.find();

    const data = [];

    for (let i = 0; i < 100; i++) {
      const member = members[Math.floor(Math.random() * members.length)];
      const card = cards[Math.floor(Math.random() * cards.length)];

      data.push({
        memberId: member.id,
        cardId: card.id,
        content: faker.lorem.sentence(),
        card,
        member
      });
    }

    await cardCommentsRepository.save(data);
  }
}
