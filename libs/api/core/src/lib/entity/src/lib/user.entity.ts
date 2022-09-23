import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';
import { Job } from './job.entity';
import { ClockIn } from './clockIn.entity';
import { ClockOff } from './clockOff.entity';
import { Token } from './token.entity';
import { Company } from '..';

@Entity()
export class User {
  protected constructor(input?: Partial<User>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as any)[key] = value;
      }
    }
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, {
    eager: true,
  })
  role: Role;

  @ManyToOne(() => Company, (item) => item.users, {
    eager: true,
  })
  company?: Company;

  @ManyToMany(() => Job, (job) => job.staff)
  jobs: Job[];

  @OneToMany(() => Job, (job) => job.builder)
  jobRequests: Job[];

  @OneToMany(() => ClockIn, (clockIn) => clockIn.staff)
  clockIns: ClockIn[];

  @OneToMany(() => ClockOff, (clockOff) => clockOff.staff)
  clockOffs: ClockOff[];

  @OneToOne(() => Token, (token) => token.user)
  token: Token;

  @Column({ default: false })
  emailVerified: boolean;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  getRole() {
    return this.role.name;
  }
}
