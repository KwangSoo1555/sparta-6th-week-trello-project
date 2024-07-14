import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsEntity } from 'src/entities/boards.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardsEntity]),
  ],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
