import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CardsEntity } from "../../entities/cards.entity";
import { ListsEntity } from "../../entities/lists.entity";

export class CardsSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const listRepository = dataSource.getRepository(ListsEntity);
    const cardRepository = dataSource.getRepository(CardsEntity);

    const lists = await listRepository.find();

    const data = [];

    for (let i = 0; i < 100; i++) {
      const list = lists[Math.floor(Math.random() * lists.length)];
      
      data.push({
        listId: list.id,
        cardTitle: faker.lorem.words(3),
        content: faker.lorem.sentence(1),
        nextIndex: i + 1, // assuming nextIndex should be unique and incremental
        cardDeadLine: faker.date.future(),
        backgroundColor: faker.color.human(), // random human-readable color
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        list,
      });
    }
    console.log(data)
    await cardRepository.save(data);
  }
}
