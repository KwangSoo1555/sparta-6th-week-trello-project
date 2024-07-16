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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", name: "board_id" })
  boardId: number;

  @IsNotEmpty({ message: "타이틀을 작성해 주세요." })
  @IsString()
  @Column({ type: "varchar", length: 200 })
  title: string;

  @Column({ type: "int", name: "next_index", default: 1 })
  nextIndex: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => BoardsEntity, (board) => board.list)
  @JoinColumn({ name: "board_id" })
  board: BoardsEntity;

  @OneToMany(() => CardsEntity, (card) => card.list)
  card: CardsEntity[];
}
