import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { FileEntity } from "./file.entity";
import { CardCommentEntity } from "./card-comment.entity";
import { ListEntity } from "./list.entity";
import { CardAssigneeEntity } from "./card-assignee.entity";
import { IsNotEmpty } from "class-validator";

@Entity("cards") // <- 엔티티 이름은 대부분 s 형태
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false, name: "list_id" })
  listId: number;

  @Column({ type: "varchar", nullable: false })
  content: string;

  // bigint 관련해서 한번 이야기해보기
  @Column({ type: "bigint", nullable: true, name: "next_index" })
  nextIndex: number;

  @Column({ type: "date", nullable: true, name: "card_dead_line" })
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

  @ManyToOne(() => ListEntity, (list) => list.card)
  list: ListEntity;

  @OneToMany(() => FileEntity, (file) => file.card, { cascade: true })
  file: FileEntity[];

  @OneToMany(() => CardCommentEntity, (cardComment) => cardComment.card)
  comments: CardCommentEntity[];

  @OneToMany(() => CardAssigneeEntity, (cardAssignee) => cardAssignee.card)
  cardAssignee: CardAssigneeEntity[];
}
