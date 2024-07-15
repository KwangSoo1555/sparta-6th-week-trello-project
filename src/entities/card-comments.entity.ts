import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CardsEntity } from "./cards.entity";
import { MembersEntity } from "./members.entity";
import { IsNotEmpty, IsString } from "class-validator";

@Entity("card_comments")
export class CardCommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "card_id" })
  cardId: number;

  @IsString()
  @IsNotEmpty({message: '본문 내용을 작성해주세요.'})
  @Column({ type: "text" })
  content: string;

  @ManyToOne(() => CardsEntity, (card) => card.comment)
  @JoinColumn({name: 'card_id'})
  card: CardsEntity;

  @OneToMany(() => MembersEntity, (member) => member.user)
  @JoinColumn({ name: "user_id" })
  member: MembersEntity;
}
