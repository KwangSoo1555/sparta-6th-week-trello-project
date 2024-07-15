import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CardsEntity } from "./cards.entity";

@Entity("files")
export class FilesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false, name: "card_id" })
  cardId: number;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: false, name: "file_url" })
  fileUrl: string;

  @CreateDateColumn({ type: "datetime", nullable: false, name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime", nullable: false, name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => CardsEntity, (card) => card.file)
  @JoinColumn({ name: "card_id" })
  card: CardsEntity;
}
