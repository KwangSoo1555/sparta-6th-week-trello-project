import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { FilesEntity } from "../../entities/files.entity";
import { CardsEntity } from "../../entities/cards.entity";
import { faker } from "@faker-js/faker";

export class FilesSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const cardRepository = dataSource.getRepository(CardsEntity);
    const filesRepository = dataSource.getRepository(FilesEntity);

    const cards = await cardRepository.find();

    const data = [];

    for (let i = 0; i < 100; i++) {
      const card = cards[Math.floor(Math.random() * cards.length)];

      data.push({
        cardId: card.id,
        title: faker.lorem.words(3),
        fileUrl: faker.internet.url(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        card,
      });
    }

    await filesRepository.save(data);
  }
}
