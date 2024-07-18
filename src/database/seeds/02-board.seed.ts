import { faker } from "@faker-js/faker";
import { BoardsEntity } from "../../entities/boards.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Colors } from "../../common/custom/types/enum-color.type";

export class BoardSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const colors = Object.values(Colors);
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        title: faker.lorem.words(3),
        content: faker.lorem.sentence(1),
        color: colors[Math.floor(Math.random() * colors.length)],
        backgroundImageUrl: faker.image.url()
      });
    }
    await dataSource.createQueryBuilder().insert().into(BoardsEntity).values(data).execute();
  }
}