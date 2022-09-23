import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { GraphQLLocalStrategy } from 'graphql-passport';
import { AuthService } from '@dfobobcat/api/shared/service';
import { User } from '@dfobobcat/api/entity';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(GraphQLLocalStrategy) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }
  async validate(req: ExpressRequest): Promise<User> {
    const {
      input: { email, password },
    } = req.body;

    return this.authService.getAuthenticatedUser(email, password);
  }
}
