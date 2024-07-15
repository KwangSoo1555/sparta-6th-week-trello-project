import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CardsEntity } from "./cards.entity";

@Entity('card-check-list')
export class CardCheckListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'card_id'})
  cardId:number;

  @Column({ name: "check_comment" })
  checkComment: string;

  @Column({ type: "boolean",default: false, name: "is_done" })
  isDone: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => CardsEntity, (card) => card.checklists)
  @JoinColumn({name: 'card_id'})
  card: CardsEntity;
}
