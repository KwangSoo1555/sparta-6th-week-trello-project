import { Module } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "src/modules/users/users.service";
import { UserController } from "src/modules/users/users.controller";

import { UsersEntity } from "src/entities/users.entity";
import { MembersEntity } from "src/entities/members.entity";
import { BoardsEntity } from "src/entities/boards.entity";

@Module({
  imports: [NestTypeOrmModule.forFeature([UsersEntity, MembersEntity, BoardsEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
