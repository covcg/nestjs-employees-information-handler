export class Permission {
  name: PermissionsEnum;
  description?: string;
}

export enum PermissionsEnum {
  CreateEmployee = 'create-employee',
  DeleteEmployee = 'delete-employee',
}
