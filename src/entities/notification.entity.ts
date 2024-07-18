import { CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { CardsEntity } from "./cards.entity";
import { MembersEntity } from "./members.entity";

@Entity("notifcaton")
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "card_id" })
  cardId: number;

  @Column({ name: "member_id" })
  memberId: number;

  @Column()
  message: string;

  @CreateDateColumn({ type: "timestamp", name: "create_at" })
  createdAt: Date;

  @ManyToOne(() => CardsEntity, (card) => card.notification, { onDelete: "CASCADE" })
  @JoinColumn({ name: "card_id" })
  card: CardsEntity[];

  @ManyToOne(() => MembersEntity, (members) => members.notification, { onDelete: "CASCADE" })
  @JoinColumn({name: 'member_id'})
  members: MembersEntity[];
}
