import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

import { ConfigService } from "@nestjs/config";

import { UsersEntity } from "src/entities/users.entity";
import { RefreshTokensEntity } from "src/entities/refresh-tokens.entity";
import { MembersEntity } from "src/entities/members.entity";
import { BoardsEntity } from "src/entities/boards.entity";
import { ListsEntity } from "src/entities/lists.entity";
import { CardsEntity } from "src/entities/cards.entity";
import { CardAssigneesEntity } from "src/entities/card-assignees.entity";
import { CardCommentsEntity } from "src/entities/card-comments.entity";
import { FilesEntity } from "src/entities/files.entity";
import { CardCheckListEntity } from "src/entities/card-check-list.entity";

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  private typeOrm: DataSource;

  constructor(private configService: ConfigService) {
    const options: DataSourceOptions = {
      type: "mysql", // 데이터베이스 유형
      url: configService.get<string>("MYSQL_URI"),
      synchronize: true, // 개발 환경에서는 true로 설정, 프로덕션 환경에서는 false로 설정 후 마이그레이션으로 실행
      logging: ["error", "warn"], // 로그 출력 여부
      entities: [
        UsersEntity,
        RefreshTokensEntity,
        BoardsEntity,
        FilesEntity,
        MembersEntity,
        ListsEntity,
        CardsEntity,
        CardAssigneesEntity,
        CardCommentsEntity,
        CardCheckListEntity,
      ], // 수정된 부분
    };
    this.typeOrm = new DataSource(options);
    this.initialize();
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.typeOrm.options,
      entities: this.typeOrm.options.entities,
      synchronize: this.typeOrm.options.synchronize,
      autoLoadEntities: true,
    };
  }

  async initialize() {
    try {
      await this.typeOrm.initialize();
      console.log("Success MySQL data source initialized!");
    } catch (error) {
      console.error(
        "Failed MySQL data source initialization. Please check your connection string and try again.",
        error,
      );
    }
  }
}
