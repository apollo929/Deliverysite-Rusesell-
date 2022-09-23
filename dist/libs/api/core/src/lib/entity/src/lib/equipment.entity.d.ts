import { Job } from './job.entity';
export declare class Equipment {
    id: number;
    name: string;
    jobs: Job[];
    createdAt: Date;
    updatedAt: Date;
}
