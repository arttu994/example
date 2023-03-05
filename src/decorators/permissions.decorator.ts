import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AccessTokenAuthGuard } from '../auth/guards/at-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

export const PERMISSIONS_KEY = 'permissions';
export const RequiredPermissions = (...permissions: string[]) =>
  applyDecorators(
    SetMetadata(PERMISSIONS_KEY, permissions),
    UseGuards(AccessTokenAuthGuard, PermissionsGuard),
  );
