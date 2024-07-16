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

  //linked Lisk
  private head: ListNode | null = null;
  private tail: ListNode | null = null;
  get getHead(): ListNode | null {
    return this.head;
  }

  get getTail(): ListNode | null {
    return this.tail;
  }
  //노드생성
  async addNode(value: number): Promise<void> {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.nextIndex++;
  }

  removeNode(value: number): void {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      return;
    }

    if (this.tail.value === value) {
      this.tail = this.tail.prev;
      this.tail.next = null;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        current.next.prev = current;
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
//연결노드
class ListNode {
  value: number;
  next: ListNode | null;
  prev: ListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
