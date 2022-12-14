import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from '../user.entity';
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    event.entity.password = await bcrypt.hash(event.entity.password, 10);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    if (
      event?.entity?.password &&
      event.entity.password.length &&
      event.entity.password !== event.databaseEntity.password
    ) {
      event.entity.password = await bcrypt.hash(event.entity.password, 10);
    }
  }
}
