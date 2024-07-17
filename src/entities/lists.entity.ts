import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { CardsEntity } from "./cards.entity";
import { BoardsEntity } from "./boards.entity";
import { IsNotEmpty, IsString } from "class-validator";

@Entity("lists")
export class ListsEntity {
  // cardTitle(cardId: number, changedFields: string[], cardTitle: any, cardTitle1: string) {
  //   throw new Error("Method not implemented.");
  // }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", name: "board_id" })
  boardId: number;

  @IsNotEmpty({ message: "타이틀을 작성해 주세요." })
  @IsString()
  @Column({ type: "varchar", length: 200 })
  title: string;

  @Column({ type: "int", name: "order_index", default: 0 })
  orderIndex: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => BoardsEntity, (board) => board.list, { onDelete: "CASCADE" })
  @JoinColumn({ name: "board_id" })
  board: BoardsEntity;

  @OneToMany(() => CardsEntity, (card) => card.list)
  card: CardsEntity[];
}
