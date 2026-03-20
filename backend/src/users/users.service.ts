import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async findAll(companyId: string) {
    return this.prisma.user.findMany({
      where: { companyId },
      select: { id: true, email: true, name: true, companyId: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, companyId: true, createdAt: true },
    })
  }

  async create(data: { email: string; password: string; name?: string; companyId: string }) {
    const hashed = await bcrypt.hash(data.password, 10)
    return this.prisma.user.create({
      data: { ...data, password: hashed },
      select: { id: true, email: true, name: true, companyId: true, createdAt: true },
    })
  }

  async update(id: string, data: { name?: string; email?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, companyId: true, createdAt: true },
    })
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}