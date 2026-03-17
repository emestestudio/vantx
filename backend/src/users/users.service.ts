import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async create(data: {
    email: string
    password: string
    name: string
    companyId: number
  }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        companyId: data.companyId,
      },
    })
  }
}