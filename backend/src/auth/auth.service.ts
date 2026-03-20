import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales incorrectas');
    const payload = { sub: user.id, companyId: user.companyId };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(companyName: string, email: string, password: string, name: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('El email ya está registrado');
    const hashed = await bcrypt.hash(password, 10);
    const company = await this.prisma.company.create({ data: { name: companyName } });
    const user = await this.prisma.user.create({
      data: { email, password: hashed, name, companyId: company.id },
    });
    const payload = { sub: user.id, companyId: user.companyId };
    return { access_token: this.jwtService.sign(payload) };
  }
}