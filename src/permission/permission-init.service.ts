import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionInitService implements OnModuleInit {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  permissionsType = ['USER', 'PRODUCT', 'CATEGORY'];

  getPermissions(name: string) {
    const create = `${name}_CREATE`;
    const read = `${name}_READ`;
    const update = `${name}_UPDATE`;
    const del = `${name}_DELETE`;

    return { create, read, update, del };
  }

  async onModuleInit() {
    const permissions = await this.permissionRepository.find();

    if (permissions.length === 0) {
      for (const permission of this.permissionsType) {
        const { create, read, update, del } = this.getPermissions(permission);
        const createPermission = this.permissionRepository.create({
          permission: create,
        });

        const readPermission = this.permissionRepository.create({
          permission: read,
        });

        const updatePermission = this.permissionRepository.create({
          permission: update,
        });

        const deletePermission = this.permissionRepository.create({
          permission: del,
        });

        await Promise.all([
          this.permissionRepository.save(createPermission),
          this.permissionRepository.save(readPermission),
          this.permissionRepository.save(updatePermission),
          this.permissionRepository.save(deletePermission),
        ]);
      }
    }
  }
}
