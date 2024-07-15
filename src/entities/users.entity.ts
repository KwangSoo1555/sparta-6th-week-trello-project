import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { IsEnum } from "class-validator";

import { RefreshTokensEntity } from "./refresh-tokens.entity";
import { MembersEntity } from "./members.entity";

import { SocialProvider } from "src/common/custom/types/enum-member-roles"

@Entity("users")
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ name: "social_id", default: null })
  socialId: string;

  @IsEnum(SocialProvider)
  @Column({ type: "enum", enum: SocialProvider, default: SocialProvider.LOCAL })
  provider: SocialProvider;

  @Column({
    name: "img_url",
    default:
      "https://i.namu.wiki/i/Bbq0E9hXYyrXbL4TnIE__vtQ2QwiZ3i40NZSLiX_a6S0ftYCndVZjf4vlruWur4I3Z0o7CZuFrRMl2CKxyk30w.webp",
  })
  imgUrl: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => RefreshTokensEntity, (refreshToken) => refreshToken.user)
  refreshToken: RefreshTokensEntity;

  @OneToMany(() => MembersEntity, (member) => member.user)
  member: MembersEntity[];
}
