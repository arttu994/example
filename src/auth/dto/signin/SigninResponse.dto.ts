import { Exclude } from 'class-transformer';
import { Roles } from '../../../roles/roles.entity';

export class SigninResponseDto {
  id: number;
  username: string;

  @Exclude()
  password: string;

  roles: Roles[];

  constructor(user: Partial<SigninResponseDto>) {
    Object.assign(this, user);
  }
}
