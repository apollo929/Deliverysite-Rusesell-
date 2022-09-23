import { RoleType } from '@dfobobcat/graphql-types';
export interface User {
  name: string;
  role: RoleType;
  email: string;
}
