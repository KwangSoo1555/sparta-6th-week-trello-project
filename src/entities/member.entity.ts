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
import { UserEntity } from "./users.entity";
import { BoardEntity } from "./board.entity";
import { CardAssigneeEntity } from "./card-assignee.entity";

@Entity("member")
export class MemberEntity {
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

  @ManyToOne(() => UserEntity, (user) => user.member)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => BoardEntity, (board) => board.member)
  @JoinColumn({ name: "board_id" })
  board: BoardEntity[];

  @OneToMany(() => CardAssigneeEntity, (cardAssignee) => cardAssignee.member)
  cardAssignee: CardAssigneeEntity[];
}
