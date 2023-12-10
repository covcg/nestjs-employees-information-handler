import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { PERMISSIONS_KEY } from './decorators/permission.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = await this.verifyToken(token);
    const admin = await this.getAdministratorWithPermissions(payload.email);
    this.validatePermission(
      context,
      admin.administratorPermissions.map((ap) => ap.permission.code),
    );
    request['admin'] = admin;
    return true;
  }

  private validatePermission(context, adminPermissions: string[]) {
    const permissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (permissions && permissions.length > 0) {
      for (const permission of permissions) {
        if (!adminPermissions.some((ap) => ap === permission)) {
          throw new UnauthorizedException('Insufficient permissions');
        }
      }
    }
  }

  private async getAdministratorWithPermissions(email: string) {
    try {
      const admin = await this.prisma.administrator.findUnique({
        where: {
          email,
        },
        include: {
          administratorPermissions: {
            include: {
              permission: true,
            },
          },
        },
      });
      return admin;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get('JWT_SECRET'),
      });
      return {
        email: payload.email,
      };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
