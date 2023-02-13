import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../permission/permission.entity';
import { PermissionModule } from '../permission/permission.module';
import { Roles } from '../roles/roles.entity';
import { RolesModule } from '../roles/roles.module';
import { UsersInitService } from './users-init.service';
import { Users } from './users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Roles, Users]),
    PermissionModule,
    RolesModule,
  ],
  providers: [UsersInitService],
})
export class UsersModule {}
