import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from '../user.entity';
export declare class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection: Connection);
    listenTo(): typeof User;
    beforeInsert(event: InsertEvent<User>): Promise<void>;
    beforeUpdate(event: UpdateEvent<User>): Promise<void>;
}
