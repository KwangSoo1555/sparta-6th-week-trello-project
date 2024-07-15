import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { MembersEntity } from "./members.entity";
import { ListsEntity } from "./lists.entity";

@Entity("boards")
export class BoardsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  content: string;

  @Column({ type: "varchar", nullable: false })
  color: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => MembersEntity, (member) => member.board)
  member: MembersEntity[];

  @OneToMany(() => ListsEntity, (list) => list.board)
  list: ListsEntity[];
}
