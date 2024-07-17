import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { ListsEntity } from "../../entities/lists.entity";
import { BoardsEntity } from "../../entities/boards.entity";

export class ListsSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const boardRepository = dataSource.getRepository(BoardsEntity);
    const listRepository = dataSource.getRepository(ListsEntity);

    const boards = await boardRepository.find();

    const data = [];

    for (let i = 0; i < 100; i++) {
      const board = boards[Math.floor(Math.random() * boards.length)];

      data.push({
        boardId: board.id,
        title: faker.lorem.words(3),
        orderIndex: i + 1, // assuming nextIndex should be unique and incremental
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        board,
      });
    }
    await listRepository.save(data);
  }
}
