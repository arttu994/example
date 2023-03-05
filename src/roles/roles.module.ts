import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../permission/permission.entity';
import { PermissionModule } from '../permission/permission.module';
import { RolesInitService } from './roles-init.service';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Roles]), PermissionModule],
  providers: [RolesService, RolesInitService],
  exports: [RolesService],
})
export class RolesModule {}
