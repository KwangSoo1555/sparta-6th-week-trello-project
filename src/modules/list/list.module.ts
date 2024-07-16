import { Module } from "@nestjs/common";
import { ListService } from "./list.service";
import { ListController } from "./list.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListsEntity } from "src/entities/lists.entity";
@Module({
  imports: [TypeOrmModule.forFeature([ListsEntity])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
