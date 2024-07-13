import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CardEntity } from "./card.entity";
import { MemberEntity } from "./member.entity";

@Entity("card_assignee")
export class CardAssigneeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "card_id" })
  cardId: number;

  @Column({ name: "member_id" })
  memberId: number;

  @ManyToOne(() => CardEntity, (card) => card.cardAssignee)
  @JoinColumn({ name: "card_id" })
  card: CardEntity;

  @ManyToOne(() => MemberEntity, (member) => member.cardAssignee)
  @JoinColumn({ name: "member_id" })
  member: MemberEntity;
}
