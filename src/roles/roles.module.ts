import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../permission/permission.entity';
import { Roles } from './roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Roles])],
})
export class RolesModule {}
