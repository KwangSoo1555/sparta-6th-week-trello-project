import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { RefreshTokenEntity } from "./refresh-token.entity";
import { SocialProvider } from "src/common/constants/types/member-role.type";
import { IsEnum } from "class-validator";
import { MemberEntity } from "./member.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ name: "social_id" })
  socialId: number;

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

  @OneToOne(() => RefreshTokenEntity, (refreshToken) => refreshToken.user)
  refreshToken: RefreshTokenEntity;

  @OneToMany(() => MemberEntity, (member) => member.user)
  member: MemberEntity[];
}
