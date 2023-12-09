import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.employee.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });
      const access_token = await this.signToken(user.id, user.email);
      return {
        email: user.email,
        role: user.role,
        access_token,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Email already taken.');
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.employee.findUnique({
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
      role: user.role,
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
