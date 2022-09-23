import { Role } from './role.entity';
import { Job } from './job.entity';
import { ClockIn } from './clockIn.entity';
import { ClockOff } from './clockOff.entity';
import { Token } from './token.entity';
import { Company } from '..';
export declare class User {
    protected constructor(input?: Partial<User>);
    id: number;
    email: string;
    name: string;
    password: string;
    role: Role;
    company?: Company;
    jobs: Job[];
    jobRequests: Job[];
    clockIns: ClockIn[];
    clockOffs: ClockOff[];
    token: Token;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    getRole(): import("./role.entity").RoleType;
}
