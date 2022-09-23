import { User } from './user.entity';
export declare enum RoleType {
    Admin = "admin",
    Builder = "builder",
    Laborer = "laborer",
    Operator = "operator"
}
export declare class Role {
    protected constructor(input?: Role);
    id: number;
    name: RoleType;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}
