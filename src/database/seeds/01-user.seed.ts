import { faker } from "@faker-js/faker";
import { UsersEntity } from "../../entities/users.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        email: faker.internet.email(),
        name: faker.internet.userName(),
        password: faker.internet.password(),
      });
    }
    await dataSource.createQueryBuilder().insert().into(UsersEntity).values(data).execute();
  }
}