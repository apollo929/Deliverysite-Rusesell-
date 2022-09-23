import { User } from '@dfobobcat/api/entity';
import { Context } from 'graphql-passport/lib/buildContext';

// export type GqlContext = Context<User> & GuestUser;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GqlContext extends Context<User> {}
