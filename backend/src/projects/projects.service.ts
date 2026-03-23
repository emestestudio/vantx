import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string) {
    return this.prisma.project.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id } })
  }

  async create(data: { name: string; description?: string; companyId: string }) {
    return this.prisma.project.create({ data })
  }

  async update(id: string, data: { name?: string; description?: string }) {
    return this.prisma.project.update({ where: { id }, data })
  }

  async delete(id: string) {
    return this.prisma.project.delete({ where: { id } })
  }
}