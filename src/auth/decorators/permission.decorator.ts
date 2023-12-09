import { PermissionsEnum } from 'src/permissions/permissions.dto';

export const PERMISSIONS_KEY = 'permissions'
export const WithPermission = (permission: PermissionsEnum) => {
  const decoratorFactory = (target, key, descriptor) => {
    let permissions = Reflect.getMetadata(PERMISSIONS_KEY, target);
    if (!permissions) {
      permissions = [];
    }
    permissions = permissions.concat([permission]);
    if (descriptor) {
      Reflect.defineMetadata(PERMISSIONS_KEY, permissions, descriptor.value);
      return descriptor;
    }
    Reflect.defineMetadata(PERMISSIONS_KEY, permissions, target);
    return target;
  };
  decoratorFactory.KEY = PERMISSIONS_KEY;
  return decoratorFactory;
};
