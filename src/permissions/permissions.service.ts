import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async getUserPermissions(userdId: number) {
    const permissions = await this.prisma.administrator.findUnique({
      where: {
        id: userdId,
      },
      include: {
        administratorPermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
    return permissions.administratorPermissions.map((ep) => ep.permission);
  }
}
