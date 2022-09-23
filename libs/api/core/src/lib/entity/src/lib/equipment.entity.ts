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
export class Equipment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text')
  public name: string;

  @ManyToMany(() => Job, (job) => job.equipment, {
    onDelete: 'CASCADE',
  })
  jobs: Job[];

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
