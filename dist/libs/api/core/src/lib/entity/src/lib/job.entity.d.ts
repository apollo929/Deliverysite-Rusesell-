import { DeepPartial } from 'typeorm';
import { Equipment } from './equipment.entity';
import { Activity } from './activity.entity';
import { User } from './user.entity';
import { ClockIn } from './clockIn.entity';
import { ClockOff } from './clockOff.entity';
declare enum JobStatus {
    Assigned = "assigned",
    UnAssigned = "unAssigned",
    Cancelled = "cancelled",
    Completed = "completed",
    InProgress = "inProgress",
    Pending = "pending"
}
export declare class Job {
    constructor(input?: DeepPartial<Job>);
    id: number;
    address: string;
    notes: string;
    priority: string;
    stage: string;
    lat: number | undefined;
    lng: number | undefined;
    status: JobStatus;
    poFile: string;
    requestDate: Date;
    reminderSent: boolean;
    builder: User;
    clockIns: ClockIn[];
    clockOffs: ClockOff[];
    staff: User[];
    equipment: Equipment[];
    activity: Activity[];
    assigner?: User;
    createdAt: Date;
    updatedAt: Date;
}
export {};
