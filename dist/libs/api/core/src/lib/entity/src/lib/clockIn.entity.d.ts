import { Job } from '..';
import { User } from './user.entity';
export declare class ClockIn {
    id: number;
    job: Job;
    staff: User;
    lat: number;
    lng: number;
    clockInTime: Date;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}
