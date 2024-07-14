import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./users.entity";

@Entity("refresh_token")
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "refresh_token" })
  refreshToken: string;

  @Column()
  ip: string;

  @Column({ name: "user_agent" })
  userAgent: Date;

  @CreateDateColumn({ name: "created_ad" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @UpdateDateColumn({ name: "expires_at" })
  expiresAt: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
