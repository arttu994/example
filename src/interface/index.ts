import UsersPermission from './permission.interface';
import UsersRoles from './roles.interface';
import JwtConfigOptions from './jwt.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Permission extends UsersPermission {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Role extends UsersRoles {}

export { Permission, Role, UsersRoles, UsersPermission, JwtConfigOptions };
