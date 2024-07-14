import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file.entity";
import { CardEntity } from "src/entities/card.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, CardEntity])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
