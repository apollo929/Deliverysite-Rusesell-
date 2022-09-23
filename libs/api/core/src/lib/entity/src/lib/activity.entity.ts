import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Job } from './job.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column('text')
  public type: string;

  @Column('timestamptz', { nullable: true })
  public date: Date;

  @ManyToMany(() => Job, (job) => job.activity, { onDelete: 'CASCADE' })
  jobs?: Job[];
}
