import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import permission from '../constants/permission';

@Injectable()
export class PermissionInitService implements OnModuleInit {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async onModuleInit() {
    const permissions = await this.permissionRepository.find();

    if (permissions.length === 0) {
      const createPermission = await this.permissionRepository.create({
        permission: permission.CREATE,
      });

      const readPermission = await this.permissionRepository.create({
        permission: permission.READ,
      });

      const updatePermission = await this.permissionRepository.create({
        permission: permission.UPDATE,
      });

      const deletePermission = await this.permissionRepository.create({
        permission: permission.DELETE,
      });

      await Promise.all([
        createPermission,
        readPermission,
        updatePermission,
        deletePermission,
      ]);
    }
  }
}
