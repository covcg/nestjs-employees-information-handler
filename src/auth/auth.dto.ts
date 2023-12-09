import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(80)
  email: string;

  @IsString()
  @Length(8, 80)
  password: string;
}

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(80)
  email: string;

  @IsString()
  @Length(8, 80)
  password: string;
}
