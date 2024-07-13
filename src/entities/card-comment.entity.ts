import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CardEntity } from "./card.entity";
import { MemberEntity } from "./member.entity";

@Entity("card_comment")
export class CardCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "card_id" })
  cardId: number;

  @Column({ type: "text" })
  content: string;

  @ManyToOne(() => CardEntity, (card) => card.comments)
  card: CardEntity;

  @OneToMany(() => MemberEntity, (member) => member.userId)
  @JoinColumn({ name: "user_id" })
  member: MemberEntity;
}
