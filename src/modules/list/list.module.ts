import { Module } from "@nestjs/common";
import { ListService } from "./list.service";
import { ListController } from "./list.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListEntity } from "src/entities/list.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
