import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    return this.prisma.company.create({
      data: { name },
    })
  }

  async findById(id: string) {
    return this.prisma.company.findUnique({ where: { id } })
  }

  async findAll() {
    return this.prisma.company.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }
}