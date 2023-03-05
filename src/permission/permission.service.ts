import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[] | undefined> {
    return await this.permissionRepository.find();
  }

  async findByName(name: string): Promise<Permission | undefined> {
    const permission = await this.permissionRepository.findOne({
      where: { permission: name },
    });

    return permission;
  }
}
