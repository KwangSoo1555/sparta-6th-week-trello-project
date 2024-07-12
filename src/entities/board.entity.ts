import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { MemberEntity } from "./member.entity";
import { ListEntity } from "./list.entity";

@Entity("board")
export class BoardEntity {
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

  @OneToMany(() => MemberEntity, (member) => member.board)
  member: MemberEntity[];

  @OneToMany(() => ListEntity, (list) => list.board)
  list: ListEntity[];
}
