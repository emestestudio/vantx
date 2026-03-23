import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string, companyName: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('El email ya esta registrado');

    const company = await this.prisma.company.create({
      data: { name: companyName },
    });

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashed, name, companyId: company.id },
    });

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      companyId: user.companyId,
    });

    return { token };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales invalidas');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales invalidas');

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      companyId: user.companyId,
    });

    return { token };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { company: true },
    });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      company: user.company.name,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: string, name: string) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { name },
    });
    return { message: 'Perfil actualizado', name: user.name };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) throw new BadRequestException('La contrasena actual es incorrecta');

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.updat