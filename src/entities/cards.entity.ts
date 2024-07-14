import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => ListsEntity, (list) => list.card)
  list: ListsEntity;

  @OneToMany(() => FilesEntity, (file) => file.card)
  file: FilesEntity[];

  @OneToMany(() => CardCommentsEntity, (cardComment) => cardComment.card)
  comment: CardCommentsEntity[];

  @OneToMany(() => CardAssigneesEntity, (cardAssignee) => cardAssignee.card)
  cardAssignee: CardAssigneesEntity[];
}
