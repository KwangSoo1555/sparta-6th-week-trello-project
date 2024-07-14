import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { CardEntity } from "./card.entity";

@Entity("file")
export class FileEntity {
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

  @ManyToOne(() => CardEntity, (card) => card.file)
  @JoinColumn({ name: "card_id" })
  card: CardEntity;
}
