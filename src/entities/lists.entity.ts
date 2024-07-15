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

  @Column({ type: "int", unique: true, name: "next_index" })
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

  //linked
  private head: ListNode | null = null;

  addNode(value: number): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.nextIndex = newNode.value;
  }

  removeNode(value: number): void {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  async deleteAllNodes(): Promise<void> {
    let currentNode = this.head;
    while (currentNode) {
      const nextNode = currentNode.next;
      this.removeNode(currentNode.value);
      currentNode = nextNode;
    }
  }
}

class ListNode {
  value: number;
  next: ListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}
