import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async getUserPermissions(userdId: number) {
    const permissions = await this.prisma.employee.findUnique({
      where: {
        id: userdId,
      },
      include: {
        employeePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
    return permissions.employeePermissions.map((ep) => ep.permission);
  }
}
