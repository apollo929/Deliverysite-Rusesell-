import { Job } from '..';
import { User } from './user.entity';
export declare class ClockOff {
    id: number;
    job: Job;
    staff: User;
    notes: string;
    clockOffTime: Date;
    totalTimeWorked: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}
