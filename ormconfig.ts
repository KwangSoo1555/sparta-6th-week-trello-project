import { DataSource } from "typeorm";

import "dotenv/config";
import { BoardsEntity } from "./src/entities/boards.entity";
import { CardAssigneesEntity } from "./src/entities/card-assignees.entity";
import { CardCheckListEntity } from "./src/entities/card-check-list.entity";
import { CardCommentsEntity } from "./src/entities/card-comments.entity";
import { CardsEntity } from "./src/entities/cards.entity";
import { FilesEntity } from "./src/entities/files.entity";
import { ListsEntity } from "./src/entities/lists.entity";
import { MembersEntity } from "./src/entities/members.entity";
import { NotificationEntity } from "./src/entities/notification.entity";
import { RefreshTokensEntity } from "./src/entities/refresh-tokens.entity";
import { UsersEntity } from "./src/entities/users.entity";

const config = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    UsersEntity,
    BoardsEntity,
    ListsEntity,
    CardsEntity,
    FilesEntity,
    CardAssigneesEntity,
    CardCheckListEntity,
    CardCommentsEntity,
    MembersEntity,
    NotificationEntity,
    RefreshTokensEntity,
  ],
  synchronize: true,
  logging: true,
});

export = config;
