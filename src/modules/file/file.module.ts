import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesEntity } from "src/entities/files.entity";
import { CardsEntity } from "src/entities/cards.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FilesEntity, CardsEntity])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
