import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '@dfobobcat/api/shared/service';
import { User } from '@dfobobcat/api/entity';
import { RoleType } from '@dfobobcat/graphql-types';
@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UserService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.getById(Number(userId));
    const addedDataToUser = {
      ...user,
      getRole() {
        return this.role.name;
      },
      hasRole(role: RoleType) {
        return this.role.name === role;
      },
    };
    done(null, addedDataToUser);
  }
}
