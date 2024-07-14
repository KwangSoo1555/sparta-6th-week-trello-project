import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
