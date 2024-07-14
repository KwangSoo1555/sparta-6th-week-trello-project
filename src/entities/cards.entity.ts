import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { FilesEntity } from "./files.entity";
import { CardCommentsEntity } from "./card-comments.entity";
import { ListsEntity } from "./lists.entity";
import { CardAssigneesEntity } from "./card-assignees.entity";

@Entity("cards")
export class CardsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false, name: "list_id" })
  listId: number;

  @Column({ type: "varchar", nullable: false })
  content: string;

  // bigint 관련해서 한번 이야기해보기
  @Column({ type: "bigint", nullable: true, name: "next_index" })
  nextIndex: number;

  @Column({ type: "datetime", nullable: false, name: "card_dead_line" })
  cardDeadLine: Date;

  @Column({ type: "varchar", nullable: true, name: "check_comment" })
  checkComment: string; // <-이녀석 존재가 무엇인지??

  @Column({ type: "boolean", default: true, name: "is_done" })
  isDone: boolean;

  @Column({ type: "varchar", default: "dark", name: "background_color" })
  backgroundColor: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  //-----------------------------------------------------------------------//

  @ManyToOne(() => ListsEntity, (list) => list.card)
  list: ListsEntity;

  @OneToMany(() => FilesEntity, (file) => file.card)
  file: FilesEntity[];

  @OneToMany(() => CardCommentsEntity, (cardComment) => cardComment.card)
  comment: CardCommentsEntity[];

  @OneToMany(() => CardAssigneesEntity, (cardAssignee) => cardAssignee.card)
  cardAssignee: CardAssigneesEntity[];
}
