import { Permission } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export enum Role {
  Employee,
  Administrator,
}

export class Employee {
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName?: string;
  lastName?: string;
  emergencyContact?: string;
  emergencyNumber?: string;
  bloodType?: string;
  role?: Role;
  permissions?: Permission[];
}

export class NewEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(80)
  email: string;
  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(80)
  hash: string;
  @IsString()
  @MaxLength(40)
  firstName?: string;
  @IsString()
  @MaxLength(40)
  @IsOptional()
  lastName?: string;
  @IsString()
  @MaxLength(80)
  @IsOptional()
  emergencyContact?: string;
  @IsString()
  @MaxLength(20)
  @IsOptional()
  emergencyNumber?: string;
  @IsString()
  @MaxLength(8)
  @IsOptional()
  bloodType?: string;
  @IsEnum(Role)
  role: Role;
}

export class UpdateEmployeeDto {
  @IsString()
  @MaxLength(40)
  @IsOptional()
  firstName?: string;
  @IsString()
  @MaxLength(40)
  @IsOptional()
  lastName?: string;
  @IsString()
  @MaxLength(80)
  @IsOptional()
  emergencyContact?: string;
  @IsString()
  @MaxLength(20)
  @IsOptional()
  emergencyNumber?: string;
  @IsString()
  @MaxLength(8)
  @IsOptional()
  bloodType?: string;
}

export class ChangeEmployeePasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(80)
  email: string;
  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(80)
  hash: string;
}
