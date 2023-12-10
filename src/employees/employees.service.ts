import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeDto } from './employees.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmployeesService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getEmployee(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
    return this.parseEmployee(employee);
  }

  async getAllEmployees() {
    const employees = await this.prisma.employee.findMany();
    const parsedEmployees = employees.map(this.parseEmployee);
    return parsedEmployees;
  }

  async getEmployees(page: number, size: number) {
    const employees = await this.prisma.employee.findMany({
      skip: size * page,
      take: size,
    });
    return employees.map(this.parseEmployee);
  }

  async createEmployee(dto: EmployeeDto) {
    let employee = await this.prisma.employee.create({
      data: dto,
    });
    const qrCode = await QRCode.toDataURL(
      `${this.config.get('FRONTEND_URL')}/employees/${employee.id}`,
    );
    employee = await this.prisma.employee.update({
      where: {
        id: employee.id,
      },
      data: {
        qrCode: Buffer.from(qrCode),
      },
    });
    return this.parseEmployee(employee);
  }

  async deleteEmployee(id: number) {
    await this.prisma.employee.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Employee deleted',
    };
  }

  parseEmployee(employee: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    emergencyContact: string;
    emergencyNumber: string;
    bloodType: string;
    qrCode: Buffer;
  }) {
    return {
      ...employee,
      qrCode: employee.qrCode.toString(),
    };
  }
}
