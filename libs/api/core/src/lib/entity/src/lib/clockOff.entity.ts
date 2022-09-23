import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Job } from '..';
import { User } from './user.entity';

@Entity()
export class ClockOff {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, (job) => job.clockOffs, {
    onDelete: 'CASCADE',
  })
  job: Job;

  @ManyToOne(() => User, (user) => user.clockOffs, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  staff: User;

  @Column('text')
  notes: string;

  @Column('timestamptz')
  clockOffTime: Date;

  @Column({ type: 'integer', nullable: false, default: 0 })
  totalTimeWorked: number;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
