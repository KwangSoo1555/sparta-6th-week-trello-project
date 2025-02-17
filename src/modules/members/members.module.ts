import { Module } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";

import { MembersService } from "./members.service";
import { MembersController } from "./members.controller";

import { BoardsEntity } from "src/entities/boards.entity";
import { MembersEntity } from "src/entities/members.entity";
import { UsersEntity } from "src/entities/users.entity";

@Module({
  imports: [NestTypeOrmModule.forFeature([BoardsEntity, MembersEntity, UsersEntity])],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
