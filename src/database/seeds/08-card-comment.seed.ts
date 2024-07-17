import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CardCommentsEntity } from "../../entities/card-comments.entity";
import { UsersEntity } from "../../entities/users.entity";
import { CardsEntity } from "../../entities/cards.entity";
import { faker } from "@faker-js/faker";

export class CardCommentsSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userRepository = dataSource.getRepository(UsersEntity);
    const cardRepository = dataSource.getRepository(CardsEntity);
    const cardCommentsRepository = dataSource.getRepository(CardCommentsEntity);

    const users = await userRepository.find();
    const cards = await cardRepository.find();

    const data = [];

    for (let i = 0; i < 100; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const card = cards[Math.floor(Math.random() * cards.length)];

      data.push({
        userId: user.id,
        cardId: card.id,
        content: faker.lorem.sentence(),
        card,
        member: user,
      });
    }

    await cardCommentsRepository.save(data);
  }
}
