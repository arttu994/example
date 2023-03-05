import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PERMISSIONS_KEY } from '../../decorators/permissions.decorator';
import { Users } from '../../users/users.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true;

    const user: Partial<Users> = context
      .switchToHttp()
      .getRequest<Request>().user;

    const userPermissions = user.roles
      .flatMap((role) => role.permissions)
      .map(({ permission }) => requiredPermissions.includes(permission));

    return userPermissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }
}
