import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CardsEntity } from "./cards.entity";
import { MembersEntity } from "./members.entity";

@Entity("card_assignees")
export class CardAssigneesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "card_id" })
  cardId: number;

  @Column({ name: "member_id" })
  memberId: number;

  @ManyToOne(() => CardsEntity, (card) => card.cardAssignee, { onDelete: "CASCADE" })
  @JoinColumn({ name: "card_id" })
  card: CardsEntity;

  @ManyToOne(() => MembersEntity, (member) => member.cardAssignee, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member: MembersEntity;
}
