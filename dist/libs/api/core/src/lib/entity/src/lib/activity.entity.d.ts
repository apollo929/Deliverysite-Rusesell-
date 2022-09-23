import { Job } from './job.entity';
export declare class Activity {
    id?: number;
    type: string;
    date: Date;
    jobs?: Job[];
}
