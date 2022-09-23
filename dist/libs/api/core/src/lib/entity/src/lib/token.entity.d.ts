import { User } from './user.entity';
export declare class Token {
    id: number;
    resetPasswordToken: string | null;
    resetPasswordExpires: string | null;
    verifyEmailToken: string | null;
    verifyEmailExpires: string | null;
    builderLoginToken: string | null;
    builderLoginExpire: string | null;
    user: User;
}
