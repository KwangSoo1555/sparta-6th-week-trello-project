import { Module } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

import { UsersEntity } from "src/entities/users.entity";
import { MembersEntity } from "src/entities/members.entity";
import { BoardsEntity } from "src/entities/boards.entity";

@Module({
  imports: [NestTypeOrmModule.forFeature([UsersEntity, MembersEntity, BoardsEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
