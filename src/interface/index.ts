import {
  UsersPermission,
  CategoryPermissions,
  ProductPermissions,
} from './permission.interface';
import UsersRoles from './roles.interface';
import JwtConfigOptions from './jwt.interface';
import { UserRefresh } from './user-refresh.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Permission
  extends UsersPermission,
    CategoryPermissions,
    ProductPermissions {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Role extends UsersRoles {}

export {
  Permission,
  Role,
  UsersRoles,
  UsersPermission,
  CategoryPermissions,
  ProductPermissions,
  JwtConfigOptions,
  UserRefresh,
};
