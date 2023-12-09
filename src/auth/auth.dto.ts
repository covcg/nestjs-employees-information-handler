import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(80)
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
