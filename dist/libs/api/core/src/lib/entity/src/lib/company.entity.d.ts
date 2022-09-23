import { DeepPartial } from 'typeorm';
import { User } from '..';
export declare class Company {
    constructor(input?: DeepPartial<Company>);
    id: number;
    name: string;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}
