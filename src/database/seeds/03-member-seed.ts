import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { MembersEntity } from "../../entities/members.entity";
import { UsersEntity } from "../../entities/users.entity";
import { BoardsEntity } from "../../entities/boards.entity";
import { MemberRoles } from "../../common/custom/types/enum-member-roles";
import { faker } from "@faker-js/faker";

export class MembersSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userRepository = dataSource.getRepository(UsersEntity);
    const boardRepository = dataSource.getRepository(BoardsEntity);
    const memberRepository = dataSource.getRepository(MembersEntity);

    const users = await userRepository.find();
    const boards = await boardRepository.find();

    const data = [];

    for (let i = 0; i < 100; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const board = boards[Math.floor(Math.random() * boards.length)];
      const role = Object.values(MemberRoles)[Math.floor(Math.random() * Object.values(MemberRoles).length)];

      // Check if user and board are defined
      if (user && board) {
        data.push({
          userId: user.id,
          boardId: board.id,
          role,
          nickname: faker.internet.userName(),
          user,
          board,
        });
      }
    }

    await memberRepository.save(data);
  }
}
