import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { NotificationEntity } from "../../entities/notification.entity";
import { CardsEntity } from "../../entities/cards.entity";
import { MembersEntity } from "../../entities/members.entity";
import { faker } from "@faker-js/faker";

export class NotificationSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const cardRepository = dataSource.getRepository(CardsEntity);
    const memberRepository = dataSource.getRepository(MembersEntity);
    const notificationRepository = dataSource.getRepository(NotificationEntity);

    const cards = await cardRepository.find();
    const members = await memberRepository.find();

    const data = [];

    for (let i = 0; i < 100; i++) {
      const card = cards[Math.floor(Math.random() * cards.length)];
      const member = members[Math.floor(Math.random() * members.length)];

      data.push({
        cardId: card.id,
        memberId: member.id,
        message: faker.lorem.sentence(),
        createdAt: faker.date.recent(),
        card,
        member,
      });
    }

    await notificationRepository.save(data);
  }
}
