import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CardCheckListEntity } from "../../entities/card-check-list.entity";
import { CardsEntity } from "../../entities/cards.entity";
import { faker } from "@faker-js/faker";

export class CardCheckListSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const cardRepository = dataSource.getRepository(CardsEntity);
    const checklistRepository = dataSource.getRepository(CardCheckListEntity);

    const cards = await cardRepository.find();
    console.log(cards)
    const data = [];
    for (let i = 0; i < 100; i++) {
      const card = cards[Math.floor(Math.random() * cards.length)];

      data.push({
        cardId: card.id,
        checkComment: faker.lorem.words(3),
        isDone: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        card,
      });
    }

    await checklistRepository.save(data);
  }
}
