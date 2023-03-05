import { Permission } from '../../interface';
import CategoryPermissions from './category-permissions';
import ProductPermissions from './product-permissions';
import UsersPermission from './users-permission';

const permission: Permission = {
  ...UsersPermission,
  ...CategoryPermissions,
  ...ProductPermissions,
};

export default permission;
