export class Permission {
  name: PermissionsEnum;
  description?: string;
}

export enum PermissionsEnum {
  CreateUser = 'create-user',
  DeleteUser = 'delete-user',
}
