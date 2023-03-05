import { Exclude } from 'class-transformer';
import { Roles } from '../roles/roles.entity';

export class UsersDto {
  id: number;

  username: string;

  @Exclude()
  password: string;

  roles: Roles[];

  constructor(user: Partial<UsersDto>) {
    Object.assign(this, user);
  }
}
