import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
export enum RoleType {
  Admin = 'admin',
  Builder = 'builder',
  Laborer = 'laborer',
  Operator = 'operator',
}
@Entity()
export class Role {
  protected constructor(input?: Role) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as any)[key] = value;
      }
    }
  }
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, type: 'text' })
  public name: RoleType;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
