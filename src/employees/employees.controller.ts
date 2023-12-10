import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './employees.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { WithPermission } from 'src/auth/decorators/permission.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('employees')
@UseGuards(AuthGuard)
export class EmployeesController {
  constructor(private service: EmployeesService) {}
  @Get()
  getEmployees(
    @Query('page', ParseIntPipe) page: number = 0,
    @Query('size', ParseIntPipe) size: number = 20,
  ) {
    return this.service.getEmployees(page, size);
  }

  @Get('all')
  getAllEmployees() {
    return this.service.getAllEmployees();
  }

  @Get(':id')
  @Public()
  getEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.service.getEmployee(id);
  }

  @Post()
  @WithPermission(PermissionsEnum.CreateEmployee)
  createEmployee(@Body() dto: EmployeeDto) {
    return this.service.createEmployee(dto);
  }
  @Delete(':id')
  @WithPermission(PermissionsEnum.DeleteEmployee)
  deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteEmployee(id);
  }
}
