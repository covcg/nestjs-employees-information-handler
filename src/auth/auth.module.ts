import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy } from './auth.strategy';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [JwtModule.register({}), PermissionsModule],
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
