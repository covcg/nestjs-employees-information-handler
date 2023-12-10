import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.prisma.administrator.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');
    const validPassword = await argon.verify(user.hash, dto.password);
    if (!validPassword) throw new ForbiddenException('Invalid credentials');
    const access_token = await this.signToken(user.id, user.email);
    return {
      email: user.email,
      access_token,
    };
  }

  signToken(id: number, email: string) {
    return this.jwt.signAsync(
      { id, email },
      {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET'),
      },
    );
  }
}
