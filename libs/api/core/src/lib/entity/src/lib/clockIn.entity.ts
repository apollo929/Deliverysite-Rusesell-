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
export class ClockIn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, (job) => job.clockIns, {
    onDelete: 'CASCADE',
  })
  job: Job;

  @ManyToOne(() => User, (user) => user.clockIns, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  staff: User;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  @Column('timestamptz')
  clockInTime: Date;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
