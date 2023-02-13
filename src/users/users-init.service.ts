import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import role from '../constants/roles';
import { RolesService } from '../roles/roles.service';
import { Users } from './users.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersInitService implements OnModuleInit {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly rolesService: RolesService,
  ) {}

  async onModuleInit() {
    const adminRole = await this.rolesService.findByRole(role.ADMIN);

    const adminUser = await this.usersRepository.findOne({
      where: { username: 'admin' },
    });

    if (!adminUser) {
      const password = await argon2.hash('admin');

      await this.usersRepository.save({
        username: 'admin',
        password,
        roles: [adminRole],
      });
    }
  }
}
