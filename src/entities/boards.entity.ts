import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { MembersEntity } from "./members.entity";
import { ListsEntity } from "./lists.entity";

import { Colors } from "../common/custom/types/enum-color.type";

@Entity("boards")
export class BoardsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  content: string;

  @Column({ type: "enum", enum: Colors, default: Colors.WHITE })
  color: Colors;

  @Column({name: 'background_image_url', default: 'https://png.pngtree.com/thumb_back/fw800/background/20231219/pngtree-pink-pastel-background-with-pink-aesthetic-sky-image_15522922.png'})
  backgroundImageUrl: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => MembersEntity, (member) => member.board)
  member: MembersEntity[];
  

  @OneToMany(() => ListsEntity, (list) => list.board)
  list: ListsEntity[];
}
