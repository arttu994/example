import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupRequestDto } from '../auth/dto/SignupRequest.dto';
import { Users } from './users.entity';
import * as argon2 from 'argon2';
import role from '../constants/roles';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly rolesService: RolesService,
  ) {}

  async findOneByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  async save(user: SignupRequestDto) {
    const password = await argon2.hash(user.password);
    const roles = await this.rolesService.findByRole(role.USER);

    const newUser = await this.usersRepository.save({
      username: user.username,
      password,
      roles: [roles],
    });

    return newUser;
  }
}
