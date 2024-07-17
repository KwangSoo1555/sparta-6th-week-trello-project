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
import { FilesEntity } from "./files.entity";
import { CardCommentsEntity } from "./card-comments.entity";
import { ListsEntity } from "./lists.entity";
import { CardAssigneesEntity } from "./card-assignees.entity";
import { CardCheckListEntity } from "./card-check-list.entity";
import { NotificationEntity } from "./notification.entity";

@Entity("cards")
export class CardsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false, name: "list_id" })
  listId: number;

  @Column({ type: "varchar", name: "card_title" })
  cardTitle: string;

  @Column({ type: "varchar", nullable: true })
  content: string;

  @Column({ type: "int", name: "card_order_index" })
  orderIndex: number;

  @Column({ type: "datetime", nullable: true, name: "card_dead_line" })
  cardDeadLine: Date;

  @Column({ type: "varchar", default: "dark", name: "background_color" })
  backgroundColor: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => ListsEntity, (list) => list.card, { onDelete: "CASCADE" })
  @JoinColumn({ name: "list_id" })
  list: ListsEntity;

  @OneToMany(() => FilesEntity, (file) => file.card)
  file: FilesEntity[];

  @OneToMany(() => CardCommentsEntity, (cardComment) => cardComment.card)
  comment: CardCommentsEntity[];

  @OneToMany(() => CardAssigneesEntity, (cardAssignee) => cardAssignee.card)
  cardAssignee: CardAssigneesEntity[];

  @OneToMany(() => CardCheckListEntity, (checklist) => checklist.card)
  checklists: CardCheckListEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.card)
  notification: NotificationEntity[];
}
