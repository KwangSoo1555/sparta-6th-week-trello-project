import { Module } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

import { UsersEntity } from "src/entities/users.entity";
import { MembersEntity } from "src/entities/members.entity";

@Module({
  imports: [NestTypeOrmModule.forFeature([UsersEntity, MembersEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
