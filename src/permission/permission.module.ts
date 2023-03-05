import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionInitService } from './permission-init.service';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionService, PermissionInitService],
  exports: [PermissionService],
})
export class PermissionModule {}
