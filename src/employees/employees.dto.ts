import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class EmployeeDto {
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
}

export class GetEmployeesQueryParams {
  @IsNumberString()
  @IsOptional()
  page: number;
  @IsNumberString()
  @IsOptional()
  size: number;
}
