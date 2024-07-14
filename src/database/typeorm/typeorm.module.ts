import { Module } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./typeorm.config";
import { CardModule } from "src/card/card.module";

@Module({
  imports: [
    NestTypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
  ],
})
export class TypeOrmModule {
  static forRootAsync(
    CardModule: CardModule,
  ):
    | import("@nestjs/common").Type<any>
    | import("@nestjs/common").DynamicModule
    | Promise<import("@nestjs/common").DynamicModule>
    | import("@nestjs/common").ForwardReference<any> {
    throw new Error("Method not implemented.");
  }
}
