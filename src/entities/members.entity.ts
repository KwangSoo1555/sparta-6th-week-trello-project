import { IsEnum } from "class-validator";
import { MemberRole } from "src/common/constants/types/member-role.type";
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

import { UsersEntity } from "./users.entity";
import { BoardsEntity } from "./boards.entity";
import { CardAssigneesEntity } from "./card-assignees.entity";

@Entity("members")
export class MembersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "board_id" })
  boardId: number;

  @IsEnum(MemberRole)
  @Column({ type: "enum", enum: MemberRole, default: MemberRole.ADMIN })
  role: MemberRole;

  @Column({ name: "user_agent" })
  userAgent: Date;

  @CreateDateColumn({ name: "created_ad" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @UpdateDateColumn({ name: "expires_at" })
  expiresAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.member)
  @JoinColumn({ name: "user_id" })
  user: UsersEntity;

  @ManyToOne(() => BoardsEntity, (board) => board.member)
  @JoinColumn({ name: "board_id" })
  board: BoardsEntity[];

  @OneToMany(() => CardAssigneesEntity, (cardAssignee) => cardAssignee.member)
  cardAssignee: CardAssigneesEntity[];
}
