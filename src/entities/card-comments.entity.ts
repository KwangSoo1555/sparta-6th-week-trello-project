import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CardsEntity } from "./cards.entity";
import { MembersEntity } from "./members.entity";
import { IsNotEmpty, IsString } from "class-validator";

@Entity("card_comments")
export class CardCommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "member_id" })
  memberId: number;

  @Column({ name: "card_id" })
  cardId: number;

  @IsString()
  @IsNotEmpty({ message: "본문 내용을 작성해주세요." })
  @Column({ type: "text" })
  content: string;

  @ManyToOne(() => CardsEntity, (card) => card.comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "card_id" })
  card: CardsEntity;

  @ManyToOne(() => MembersEntity, (member) => member.userId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member: MembersEntity;
}
