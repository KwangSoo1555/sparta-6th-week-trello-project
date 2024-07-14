import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BoardModule } from "./modules/board/board.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FileModule } from "./modules/file/file.module";
import { EmailVerificationModule } from "./modules/auth/email-verification/email-verification.module";
import { CardModule } from "./card/card.module";
import { ConfigService, ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        synchronize: configService.get<boolean>("DB_SYNC"),
        autoLoadEntities: true, // 이 코드가 있어서 별도로 엔티티들을 추가로 입력해도 자동으로 엔티티를 불러온다.
        logging: true, // DB에서 쿼리가 발생할 때마다 터미널에서 low쿼리가 출력이 되게 해주는 코드
      }),
    }),
    BoardModule,
    FileModule,
    EmailVerificationModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
