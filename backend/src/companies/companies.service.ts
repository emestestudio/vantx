import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {

  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; rut: string; email?: string; phone?: string }) {
    return this.prisma.company.create({
      data: {
        name: data.name,
        rut: data.rut,
        email: data.email,
        phone: data.phone
      }
    });
  }

  async findAll() {
    return this.prisma.company.findMany();
  }

}