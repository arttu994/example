import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionService } from '../permission/permission.service';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';
import permission from '../constants/permission';
import role from '../constants/roles';

@Injectable()
export class RolesInitService implements OnModuleInit {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    private readonly permissionService: PermissionService,
  ) {}

  async onModuleInit() {
    const roles = await this.rolesRepository.find();
    if (roles.length === 0) {
      const permissions = await this.permissionService.findAll();

      if (!permissions) {
        throw new Error('Permissions not found');
      }

      const readPermission = permissions.find(
        (perm) => perm.permission === permission.READ,
      );

      const regularUser = this.rolesRepository.create({
        role: role.USER,
        permissions: [readPermission],
      });

      const adminUser = this.rolesRepository.create({
        role: role.ADMIN,
        permissions: permissions,
      });

      await Promise.all([
        this.rolesRepository.save(regularUser),
        this.rolesRepository.save(adminUser),
      ]);
    }
  }
}
