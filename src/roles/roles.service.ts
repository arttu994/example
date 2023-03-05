import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async findAll(): Promise<Roles[] | undefined> {
    return await this.rolesRepository.find();
  }

  async findByRole(roleName: string): Promise<Roles | undefined> {
    const role = await this.rolesRepository.findOne({
      where: { role: roleName },
    });

    return role;
  }
}
