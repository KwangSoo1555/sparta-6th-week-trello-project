import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEnum } from "class-validator";
import { MemberRoles } from "../common/custom/types/enum-member-roles";

import { UsersEntity } from "./users.entity";
import { BoardsEntity } from "./boards.entity";
import { CardAssigneesEntity } from "./card-assignees.entity";
import { NotificationEntity } from "./notification.entity";
import { CardCommentsEntity } from "./card-comments.entity";

@Entity("members")
export class MembersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "board_id" })
  boardId: number;

  @IsEnum(MemberRoles)
  @Column({ type: "enum", enum: MemberRoles, default: MemberRoles.ONLY_VIEW })
  role: MemberRoles;

  @Column({ type: "varchar", length: 50, default: null })
  nickname: string;

  @Column({ type: "boolean", default: false })
  isCreator: boolean;
  
  @ManyToOne(() => UsersEntity, (user) => user.member)
  @JoinColumn({ name: "user_id" })
  user: UsersEntity;

  @OneToMany(() => CardCommentsEntity, (cardComment) => cardComment.member)
  cardComment: CardCommentsEntity[];

  @ManyToOne(() => BoardsEntity, (board) => board.member)
  @JoinColumn({ name: "board_id" })
  board: BoardsEntity[];

  @OneToMany(() => CardAssigneesEntity, (cardAssignee) => cardAssignee.member)
  cardAssignee: CardAssigneesEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.members)
  notification: NotificationEntity[];
}
