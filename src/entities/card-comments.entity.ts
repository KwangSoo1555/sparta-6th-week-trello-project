import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CardsEntity } from "./cards.entity";
import { MembersEntity } from "./members.entity";

@Entity("card_comments")
export class CardCommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "card_id" })
  cardId: number;

  @Column({ type: "text" })
  content: string;

  @ManyToOne(() => CardsEntity, (card) => card.comment)
  card: CardsEntity;

  @OneToMany(() => MembersEntity, (member) => member.user)
  @JoinColumn({ name: "user_id" })
  member: MembersEntity;
}
