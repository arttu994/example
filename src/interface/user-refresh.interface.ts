import { Role } from './index';

export class UserRefresh {
  sub: number;
  username: string;
  roles: Role[];
  iat: number;
  exp: number;
  refreshToken: string;

  constructor(user: Partial<UserRefresh>) {
    Object.assign(this, user);
  }
}
