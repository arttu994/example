import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Roles } from '../../../roles/roles.entity';

export class SignupResponseDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  roles: Roles[];

  constructor(user: Partial<SignupResponseDto>) {
    Object.assign(this, user);
  }
}
