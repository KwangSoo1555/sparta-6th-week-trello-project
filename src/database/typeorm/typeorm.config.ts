import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { ENV } from "src/common/constants/env.constant";

// MySQL TypeORM 설정
const options: DataSourceOptions = {
  type: "mysql", // 데이터베이스 유형
  url: ENV.MYSQL_URI,
  synchronize: true, // 개발 환경에서는 true로 설정, 프로덕션 환경에서는 false로 설정 후 마이그레이션으로 실행
  logging: ["error", "warn"], // 로그 출력 여부
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
};

export class TypeOrmConfig implements TypeOrmOptionsFactory {
  private readonly typeOrm: DataSource;

  constructor() {
    this.typeOrm = new DataSource(options);
    this.initialize();
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.typeOrm.options,
      entities: this.typeOrm.options.entities,
      synchronize: this.typeOrm.options.synchronize,
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
