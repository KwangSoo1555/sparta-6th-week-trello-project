import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

import { UserEntity } from "src/entities/users.entity";
import { RefreshTokenEntity } from "src/entities/refresh-token.entity";
import { MemberEntity } from "src/entities/member.entity";
import { BoardEntity } from "src/entities/board.entity";
import { ListEntity } from "src/entities/list.entity";
import { CardEntity } from "src/entities/card.entity";
import { CardAssigneeEntity } from "src/entities/card-assignee.entity";
import { CardCommentEntity } from "src/entities/card-comment.entity";
import { FileEntity } from "src/entities/file.entity";

import { ENV } from "src/common/constants/env.constant";

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  private typeOrm: DataSource;

  constructor() {
    const options: DataSourceOptions = {
      type: "mysql", // 데이터베이스 유형
      url: ENV.MYSQL_URI,
      synchronize: true, // 개발 환경에서는 true로 설정, 프로덕션 환경에서는 false로 설정 후 마이그레이션으로 실행
      logging: ["error", "warn"], // 로그 출력 여부
      entities: [
        UserEntity,
        RefreshTokenEntity,
        BoardEntity,
        FileEntity,
        MemberEntity,
        ListEntity,
        CardEntity,
        CardAssigneeEntity,
        CardCommentEntity,
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
