import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Column,
  ManyToOne,
  DeepPartial,
  OneToMany,
} from 'typeorm';
import { Equipment } from './equipment.entity';
import { Activity } from './activity.entity';
import { User } from './user.entity';
import { ClockIn } from './clockIn.entity';
import { ClockOff } from './clockOff.entity';
enum JobStatus {
  Assigned = 'assigned',
  UnAssigned = 'unAssigned',
  Cancelled = 'cancelled',
  Completed = 'completed',
  InProgress = 'inProgress',
  Pending = 'pending',
}
@Entity()
export class Job {
  constructor(input?: DeepPartial<Job>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as any)[key] = value;
      }
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  public address: string;

  @Column({ default: '' })
  public notes: string;

  @Column({ default: '' })
  public priority: string;

  @Column({ default: '' })
  public stage: string;

  @Column('float', { nullable: true })
  lat: number | undefined;

  @Column('float', { nullable: true })
  lng: number | undefined;

  @Column('text')
  public status: JobStatus;

  @Column('text', { nullable: true })
  public poFile: string;

  @Column('timestamptz')
  requestDate: Date;

  @Column({ default: false })
  reminderSent: boolean;

  @ManyToOne(() => User, (user) => user.jobRequests, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  builder: User;

  @OneToMany(() => ClockIn, (clockIn) => clockIn.job)
  clockIns: ClockIn[];

  @OneToMany(() => ClockOff, (clockOff) => clockOff.job)
  clockOffs: ClockOff[];

  @ManyToMany(() => User, (user) => user.jobs)
  @JoinTable({ name: 'job_staff' })
  staff: User[];

  @ManyToMany(() => Equipment, (equipment) => equipment.jobs, {
    cascade: true,
  })
  @JoinTable({ name: 'job_equipment' })
  equipment: Equipment[];

  @ManyToMany(() => Activity, (activity) => activity.jobs, {
    cascade: true,
  })
  @JoinTable({ name: 'job_activity' })
  activity: Activity[];

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
