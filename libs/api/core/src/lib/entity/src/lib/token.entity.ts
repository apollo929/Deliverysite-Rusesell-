import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Exclude()
  resetPasswordToken: string | null;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  resetPasswordExpires: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Exclude()
  verifyEmailToken: string | null;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  verifyEmailExpires: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Exclude()
  builderLoginToken: string | null;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  builderLoginExpire: string | null;

  @OneToOne(() => User, (user) => user.token, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
