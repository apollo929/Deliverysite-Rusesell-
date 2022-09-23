import {
  Entity,
  DeepPartial,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '..';

@Entity()
export class Company {
  constructor(input?: DeepPartial<Company>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as any)[key] = value;
      }
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  public name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
