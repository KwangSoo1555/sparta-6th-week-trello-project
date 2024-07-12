import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { FileEntity } from "./file.entity";
import { CardCommentEntity } from "./card-comment.entity";
import { ListEntity } from "./list.entity";
import { CardAssigneeEntity } from "./card-assignee.entity";

@Entity("card")
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false, name: "list_id" })
  listId: number;

  @Column({ type: "varchar", nullable: false })
  context: string;

  @Column({ type: "bigint", nullable: false, name: "next_index" })
  nextIndex: number;

  @Column({ type: "date", nullable: true, name: "card_dead_line" })
  cardDeadLine: Date;

  @Column({ type: "varchar", nullable: true, name: "check_comment" })
  checkComment: string;

  @Column({ type: "boolean", nullable: false, name: "is_done" })
  isDone: boolean;

  @Column({ type: "varchar", nullable: false, name: "background_color" })
  backgroundColor: string;

  @Column({ type: "datetime", nullable: false, name: "created_at" })
  createdAt: Date;

  @Column({ type: "datetime", nullable: false, name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => ListEntity, (list) => list.card)
  list: ListEntity;

  @OneToMany(() => FileEntity, (file) => file.card)
  file: FileEntity[];

  @OneToMany(() => CardCommentEntity, (cardComment) => cardComment.card)
  comments: CardCommentEntity[];

  @OneToMany(() => CardAssigneeEntity, (cardAssignee) => cardAssignee.card)
  cardAssignee: CardAssigneeEntity[];
}
